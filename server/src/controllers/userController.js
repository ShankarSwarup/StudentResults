const bcrypt = require('bcryptjs');
const Student = require('../models/student');
const Teacher = require('../models/teacher');

// Desc Add Student manually
const addStudent = async (req, res) => {
    const { depart, name, reg, dob, email, phn, gender, address, year } = req.body;
    const user = await Student.findOne({ Reg: reg });

    if (user) {
        return res.status(400).json({ status: "err", message: "Student already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(phn, salt); // Default password is phn

    const student = new Student({
        Reg: reg,
        Name: name,
        Password: hashedPassword,
        Phn: phn,
        Dept: depart,
        Gender: gender,
        DOB: dob,
        Email: email,
        Address: address,
        Year: year,
    });

    await student.save();
    res.json({ status: 'ok', message: "Successful !" });
};

// Desc Add Teacher manually
const addTeacher = async (req, res) => {
    const { name, reg, pass, dept } = req.body;
    const user = await Teacher.findOne({ Tid: reg });

    if (user) {
        return res.status(400).json({ status: "err", message: "Teacher already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    const teacher = new Teacher({
        Tid: reg,
        Name: name,
        Dept: dept,
        Password: hashedPassword,
    });

    await teacher.save();
    res.json({ status: 'ok', message: "Successful !" });
};

// Desc Find Single Student by reg
const findStudentByReg = async (req, res) => {
    const { ten } = req.body;
    const user = await Student.findOne({ Reg: ten });
    if (user) {
        res.json({ status: 'ok', data: user });
    } else {
        res.status(404).json({ status: "err", message: "No user found!" });
    }
};

// Desc Find Students by Dept and Year
const findStudents = async (req, res) => {
    const { depart, year } = req.body;
    const data = await Student.find({ Dept: depart, Year: year });
    if (data && data.length > 0) {
        res.json({ status: 'ok', data: data });
    } else {
        res.status(404).json({ status: "err", message: "No students found!" });
    }
};

// Desc Student Excel Upload
const uploadStudentsExcel = async (req, res) => {
    const data = req.body.files;
    const salt = await bcrypt.genSalt(10);

    for (const d of data) {
        // Excel date conversion helper
        const utc_days = Math.floor(d.DOB - 25569);
        const utc_value = utc_days * 86400;
        const date_info = new Date(utc_value * 1000);
        const formattedDate = `${date_info.getFullYear()}-${date_info.getMonth() + 1}-${date_info.getDate()}`;

        const hashedPassword = await bcrypt.hash(String(d.Phn), salt);

        const student = new Student({
            Reg: d.Reg,
            Name: d.Name,
            Password: hashedPassword,
            Phn: d.Phn,
            Dept: d.Dept,
            Gender: d.Gender,
            DOB: formattedDate,
            Email: d.Email,
            Address: d.Address,
            Year: String(d.year),
        });
        await student.save();
    }
    res.json({ status: 'ok' });
};

// Desc Add Link to Student profile
const addStudentLink = async (req, res) => {
    const { title, result, v } = req.body; // v is registration number
    const user = await Student.findOne({ Reg: v });
    if (!user) {
        return res.status(404).json({ status: "err", message: "Student not found!" });
    }
    user.Links.push({ title, link: result });
    await user.save();
    res.json({ status: 'ok', data: user });
};

// Desc Delete Student
const deleteStudent = async (req, res) => {
    const { reg } = req.body;
    await Student.findOneAndDelete({ Reg: reg });
    res.json({ status: 'ok', message: "Student record removed" });
};

module.exports = { addStudent, addTeacher, findStudents, findStudentByReg, uploadStudentsExcel, addStudentLink, deleteStudent };
