const Subject = require('../models/subjects');
const Manage = require('../models/manage');
const ExcelModel = require('../models/excelschema');
const ExcelJS = require('exceljs');
const { Readable } = require('stream');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Add Subject
const addSubject = catchAsync(async (req, res, next) => {
    const { subj, cod } = req.body;
    const existing = await Subject.findOne({ Subject: subj });
    if (existing) {
        return next(new AppError("Subject already exists!", 400));
    }
    const subject = new Subject({ Subject: subj, Code: cod });
    await subject.save();
    res.json({ status: 'ok', message: "Successful !" });
});

// Manage Subject (Add to semister/dept)
const manageSubject = catchAsync(async (req, res, next) => {
    const { subject, semister, depart, action } = req.body; // Action can be 'add', 'remove'
    const user = await Manage.findOne({ Dept: depart, Sem: semister });

    if (user) {
        if (action === 'add') {
            if (user["Subjects"].includes(subject)) {
                return next(new AppError("Subject Already there!", 400));
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
            return next(new AppError("Entry not found", 404));
        }
    }
});

// Find Subjects by sem / dept
const findSubjects = catchAsync(async (req, res, next) => {
    const { semister, depart } = req.body;
    const user = await Manage.findOne({ Dept: depart, Sem: semister });
    if (!user) {
        return next(new AppError("No Data !", 404));
    }
    res.json({ status: 'ok', data: user.Subjects });
});

// Results upload from Excel
const uploadResults = catchAsync(async (req, res, next) => {
    if (!req.file || !req.file.buffer) {
        return next(new AppError("Invalid or empty file provided.", 400));
    }

    const stream = new Readable();
    stream.push(req.file.buffer);
    stream.push(null);

    const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader();
    workbookReader.read(stream);

    const requiredKeys = ["regNo", "sem", "dept", "grad"];
    const validGrades = ["O", "A", "B", "C", "D", "E", "F", "Nill"];
    const errors = [];
    let headers = [];

    for await (const worksheetReader of workbookReader) {
        let isFirstRow = true;
        for await (const row of worksheetReader) {
            if (isFirstRow) {
                headers = row.values.slice(1);
                isFirstRow = false;
                
                const missingKeys = requiredKeys.filter(k => !headers.includes(k));
                if (missingKeys.length > 0) {
                    return next(new AppError(`Missing required columns: ${missingKeys.join(', ')}`, 400));
                }
                continue;
            }

            const rowValues = row.values.slice(1);
            const d = {};
            headers.forEach((header, index) => {
                d[header] = rowValues[index];
            });

            if (!d.regNo || !d.sem || !d.dept || !d.grad) {
                errors.push(`Row ${row.number}: Missing mandatory fields`);
                continue;
            }

            let rowHasError = false;
            for (const key of headers) {
                if (!requiredKeys.includes(key) && key !== "year") {
                    const grade = String(d[key] || '').trim();
                    if (!validGrades.includes(grade) && grade !== 'undefined' && grade !== '') {
                        errors.push(`Row ${row.number}: Invalid grade '${grade}' for subject '${key}'`);
                        rowHasError = true;
                    }
                }
            }

            if (rowHasError) continue;

            const xi = String(d.sem);
            const user = await ExcelModel.findOne({ year: String(d.grad), regNo: String(d.regNo), sem: xi, dept: d.dept });

            if (!user) {
                const subjectGradeArray = [];
                for (const key of headers) {
                    if (!requiredKeys.includes(key) && key !== "year") {
                        subjectGradeArray.push({ sub: key, grade: String(d[key] || 'Nill').trim() });
                    }
                }
                const record = new ExcelModel({ year: String(d.grad), regNo: String(d.regNo), sem: xi, subject: subjectGradeArray, dept: d.dept });
                await record.save();
            } else {
                for (const key of headers) {
                    if (!requiredKeys.includes(key) && key !== "year") {
                        const grade = String(d[key] || 'Nill').trim();
                        if (grade !== 'Nill' && grade !== 'undefined' && grade !== '') {
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
    }

    if (errors.length > 0) {
        return next(new AppError("Validation failed for some rows", 400));
    }

    res.json({ status: 'ok', message: "All records processed successfully!" });
});

// Edit Subject Code
const editSubject = catchAsync(async (req, res, next) => {
    const { subj, cod } = req.body;
    const user = await Subject.findOne({ Subject: subj });
    if (!user) {
        return next(new AppError("Subject not found", 404));
    }
    user.Code = cod;
    await user.save();
    res.json({ status: 'ok', message: "Successful !" });
});

// Get All Subjects
const getAllSubjects = catchAsync(async (req, res, next) => {
    const subjects = await Subject.find({});
    res.json({ status: 'ok', data: subjects });
});

// Declare / Update Results manually
const updateResultsManual = catchAsync(async (req, res, next) => {
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
});

// Get student results by reg and sem
const getStudentResults = catchAsync(async (req, res, next) => {
    const { ten, c } = req.body; // ten is reg, c is sem or 'backlog'
    if (c !== 'backlog') {
        const user = await ExcelModel.findOne({ regNo: ten, sem: c });
        if (!user) {
            return next(new AppError("No result found!", 404));
        }
        res.json({ status: 'ok', data: user });
    } else {
        const user = await ExcelModel.find({ regNo: ten });
        const backlogs = [];
        if (user.length === 0) {
            return next(new AppError("No results found!", 404));
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
});

// Delete Subject
const deleteSubject = catchAsync(async (req, res, next) => {
    const { code } = req.body;
    const user = await Subject.findOneAndDelete({ Code: code });
    if (!user) {
        return next(new AppError("Not found", 404));
    }
    res.json({ status: 'ok', message: "Subject deleted successfully" });
});

// Get all students results for a specific semester and department
const getSemesterResults = catchAsync(async (req, res, next) => {
    const { depart, sem, year } = req.body;
    const results = await ExcelModel.find({ dept: depart, sem: sem, year: year });
    if (results.length === 0) {
        return next(new AppError("No records found for this criteria.", 404));
    }
    res.json({ status: 'ok', data: results });
});

module.exports = { addSubject, manageSubject, findSubjects, uploadResults, editSubject, getAllSubjects, updateResultsManual, getStudentResults, deleteSubject, getSemesterResults };
