const bcrypt = require('bcryptjs');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { Readable } = require('stream');
const ExcelJS = require('exceljs');

// Desc Add Student manually
const addStudent = catchAsync(async (req, res, next) => {
    const { depart, name, reg, dob, email, phn, gender, address, year } = req.body;
    const user = await Student.findOne({ Reg: reg });

    if (user) {
        return next(new AppError("Student already exists!", 400));
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
});

// Desc Add Teacher manually
const addTeacher = catchAsync(async (req, res, next) => {
    const { name, reg, pass, dept } = req.body;
    const user = await Teacher.findOne({ Tid: reg });

    if (user) {
        return next(new AppError("Teacher already exists!", 400));
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
});

// Desc Find Single Student by reg
const findStudentByReg = catchAsync(async (req, res, next) => {
    const { ten } = req.body;
    const user = await Student.findOne({ Reg: ten });
    if (!user) {
        return next(new AppError("No user found!", 404));
    }
    res.json({ status: 'ok', data: user });
});

// Desc Find Students by Dept and Year
const findStudents = catchAsync(async (req, res, next) => {
    const { depart, year } = req.body;
    const data = await Student.find({ Dept: depart, Year: year });
    if (!data || data.length === 0) {
        return next(new AppError("No students found!", 404));
    }
    res.json({ status: 'ok', data: data });
});

const uploadStudentsExcel = catchAsync(async (req, res, next) => {
    if (!req.file || !req.file.buffer) {
        return next(new AppError("Invalid or empty file provided.", 400));
    }

    const stream = new Readable();
    stream.push(req.file.buffer);
    stream.push(null);

    const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader();
    workbookReader.read(stream);

    const salt = await bcrypt.genSalt(10);
    let headers = [];

    for await (const worksheetReader of workbookReader) {
        let isFirstRow = true;
        for await (const row of worksheetReader) {
            if (isFirstRow) {
                headers = row.values.slice(1);
                isFirstRow = false;
                continue;
            }

            const rowValues = row.values.slice(1);
            const d = {};
            headers.forEach((header, index) => {
                d[header] = rowValues[index];
            });

            if (!d.Reg || !d.Name) continue;

            let formattedDate = new Date().toISOString();
            if (d.DOB && !isNaN(d.DOB)) {
                const utc_days = Math.floor(d.DOB - 25569);
                const utc_value = utc_days * 86400;
                const date_info = new Date(utc_value * 1000);
                formattedDate = `${date_info.getFullYear()}-${date_info.getMonth() + 1}-${date_info.getDate()}`;
            } else if (d.DOB) {
                formattedDate = String(d.DOB);
            }

            const hashedPassword = await bcrypt.hash(String(d.Phn || 'password'), salt);
            const existingUser = await Student.findOne({ Reg: d.Reg });
            
            if (!existingUser) {
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
        }
    }
    res.json({ status: 'ok', message: "Batch enrollment processed successfully." });
});

// Desc Add Link to Student profile
const addStudentLink = catchAsync(async (req, res, next) => {
    const { title, result, v } = req.body; // v is registration number
    const user = await Student.findOne({ Reg: v });
    if (!user) {
        return next(new AppError("Student not found!", 404));
    }
    user.Links.push({ title, link: result });
    await user.save();
    res.json({ status: 'ok', data: user });
});

// Desc Delete Student
const deleteStudent = catchAsync(async (req, res, next) => {
    const { reg } = req.body;
    const user = await Student.findOneAndDelete({ Reg: reg });
    if (!user) {
        return next(new AppError("Student not found!", 404));
    }
    res.json({ status: 'ok', message: "Student record removed" });
});

module.exports = { addStudent, addTeacher, findStudents, findStudentByReg, uploadStudentsExcel, addStudentLink, deleteStudent };
