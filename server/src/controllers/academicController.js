const Subject = require('../models/subjects');
const Manage = require('../models/manage');
const ExcelModel = require('../models/excelschema');

// Add Subject
const addSubject = async (req, res) => {
    const { subj, cod } = req.body;
    const existing = await Subject.findOne({ Subject: subj });
    if (existing) {
        return res.status(400).json({ status: "err", message: "Subject already exists!" });
    }
    const subject = new Subject({ Subject: subj, Code: cod });
    await subject.save();
    res.json({ status: 'ok', message: "Successful !" });
};

// Manage Subject (Add to semister/dept)
const manageSubject = async (req, res) => {
    const { subject, semister, depart, action } = req.body; // Action can be 'add', 'remove'
    const user = await Manage.findOne({ Dept: depart, Sem: semister });

    if (user) {
        if (action === 'add') {
            if (user["Subjects"].includes(subject)) {
                return res.status(400).json({ status: "err", message: "Subject Already there!" });
            }
            user["Subjects"].push(subject);
        } else if (action === 'remove') {
            user["Subjects"] = user["Subjects"].filter(item => item !== subject);
        }
        await user.save();
        res.json({ status: 'ok', message: "Successful !" });
    } else {
        if (action === 'add') {
            const newManage = new Manage({ Dept: depart, Sem: semister, Subjects: [subject] });
            await newManage.save();
            res.json({ status: 'ok', message: "Successful !" });
        } else {
            res.status(404).json({ status: "err", message: "Entry not found" });
        }
    }
};

// Find Subjects by sem / dept
const findSubjects = async (req, res) => {
    const { semister, depart } = req.body;
    const user = await Manage.findOne({ Dept: depart, Sem: semister });
    if (user) {
        res.json({ status: 'ok', data: user.Subjects });
    } else {
        res.status(404).json({ status: 'err', message: "No Data !" });
    }
};

// Results upload from Excel
// Results upload from Excel with Validation
const uploadResults = async (req, res) => {
    const data = req.body.files;
    if (!data || !Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ status: "err", message: "Invalid or empty data provided." });
    }

    const keys = Object.keys(data[0]);
    const requiredKeys = ["regNo", "sem", "dept", "grad"];

    // Validate headers
    const missingKeys = requiredKeys.filter(k => !keys.includes(k));
    if (missingKeys.length > 0) {
        return res.status(400).json({ status: "err", message: `Missing required columns: ${missingKeys.join(', ')}` });
    }

    const validGrades = ["O", "A", "B", "C", "D", "E", "F", "Nill"];
    const errors = [];

    for (let i = 0; i < data.length; i++) {
        const d = data[i];
        const rowNum = i + 2; // Assuming 1-based index and header row

        // Basic presence validation
        if (!d.regNo || !d.sem || !d.dept || !d.grad) {
            errors.push(`Row ${rowNum}: Missing mandatory fields (regNo, sem, dept, grad)`);
            continue;
        }

        // Grade validation for subject columns
        for (const key of keys) {
            if (!requiredKeys.includes(key) && key !== "year") {
                const grade = String(d[key] || '').trim();
                if (!validGrades.includes(grade)) {
                    errors.push(`Row ${rowNum}: Invalid grade '${grade}' for subject '${key}'`);
                }
            }
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({ status: "err", message: "Validation failed", details: errors.slice(0, 10) });
    }

    // Process if all valid
    for (const d of data) {
        const xi = String(d.sem);
        const user = await ExcelModel.findOne({ year: String(d.grad), regNo: String(d.regNo), sem: xi, dept: d.dept });

        if (!user) {
            const subjectGradeArray = [];
            for (const key of keys) {
                if (!requiredKeys.includes(key) && key !== "year") {
                    subjectGradeArray.push({ sub: key, grade: String(d[key] || 'Nill').trim() });
                }
            }
            const record = new ExcelModel({ year: String(d.grad), regNo: String(d.regNo), sem: xi, subject: subjectGradeArray, dept: d.dept });
            await record.save();
        } else {
            for (const key of keys) {
                if (!requiredKeys.includes(key) && key !== "year") {
                    const grade = String(d[key] || 'Nill').trim();
                    if (grade !== 'Nill') {
                        const subjectIndex = user.subject.findIndex(s => s.sub === key);
                        if (subjectIndex !== -1) {
                            user.subject[subjectIndex].grade = grade;
                        } else {
                            user.subject.push({ sub: key, grade: grade });
                        }
                    }
                }
            }
            await user.save();
        }
    }
    res.json({ status: 'ok', message: "All records processed successfully!" });
};

// Edit Subject Code
const editSubject = async (req, res) => {
    const { subj, cod } = req.body;
    const user = await Subject.findOne({ Subject: subj });
    if (user) {
        user.Code = cod;
        await user.save();
        res.json({ status: 'ok', message: "Successful !" });
    } else {
        res.status(404).json({ status: 'err', message: "Subject not found" });
    }
};

// Get All Subjects
const getAllSubjects = async (req, res) => {
    const subjects = await Subject.find({});
    res.json({ status: 'ok', data: subjects });
};

// Declare / Update Results manually
const updateResultsManual = async (req, res) => {
    const { depart, semister, year, reg, a } = req.body;
    const user = await ExcelModel.findOne({ year: year, regNo: reg, sem: semister, dept: depart });
    if (!user) {
        const record = new ExcelModel({ year: year, regNo: reg, sem: semister, subject: a, dept: depart });
        await record.save();
        res.json({ status: 'ok', message: "Successful" });
    } else {
        a.forEach((d) => {
            const idx = user.subject.findIndex(f => f.sub === d.sub);
            if (idx !== -1) {
                if (d.grade !== "No Change") {
                    user.subject[idx].grade = d.grade;
                }
            } else {
                user.subject.push({ sub: d.sub, grade: d.grade });
            }
        });
        await user.save();
        res.json({ status: 'ok', message: "Successful" });
    }
};

// Get student results by reg and sem
const getStudentResults = async (req, res) => {
    const { ten, c } = req.body; // ten is reg, c is sem or 'backlog'
    if (c !== 'backlog') {
        const user = await ExcelModel.findOne({ regNo: ten, sem: c });
        if (!user) {
            return res.status(404).json({ status: "err", message: "No result found!" });
        }
        res.json({ status: 'ok', data: user });
    } else {
        const user = await ExcelModel.find({ regNo: ten });
        const backlogs = [];
        if (user.length === 0) {
            return res.status(404).json({ status: "err", message: "No results found!" });
        }
        user.forEach((item) => {
            item.subject.forEach((a) => {
                if (a.grade === 'F') {
                    backlogs.push([a.sub, item.sem]);
                }
            });
        });
        res.json({ status: 'ok', message: "backlogs", data: user[0], back: backlogs });
    }
};

// Delete Subject
const deleteSubject = async (req, res) => {
    const { code } = req.body;
    const user = await Subject.findOneAndDelete({ Code: code });
    if (user) {
        res.json({ status: 'ok', message: "Subject deleted successfully" });
    } else {
        res.status(404).json({ status: 'err', message: "Not found" });
    }
};

// Get all students results for a specific semester and department
const getSemesterResults = async (req, res) => {
    const { depart, sem, year } = req.body;
    try {
        const results = await ExcelModel.find({ dept: depart, sem: sem, year: year });
        if (results.length === 0) {
            return res.status(404).json({ status: "err", message: "No records found for this criteria." });
        }
        res.json({ status: 'ok', data: results });
    } catch (err) {
        res.status(500).json({ status: 'err', message: "Server error" });
    }
};

module.exports = { addSubject, manageSubject, findSubjects, uploadResults, editSubject, getAllSubjects, updateResultsManual, getStudentResults, deleteSubject, getSemesterResults };
