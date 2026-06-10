const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// @desc    Auth user & get token (Student)
const authStudent = catchAsync(async (req, res, next) => {
    const { lreg, lpassword } = req.body;
    const user = await Student.findOne({ Reg: lreg });

    if (user && (await bcrypt.compare(lpassword, user.Password))) {
        res.json({
            status: 'ok',
            data: {
                _id: user._id,
                name: user.Name,
                reg: user.Reg,
                token: generateToken(user._id),
            },
        });
    } else {
        return next(new AppError('Invalid registration number or password', 401));
    }
});

// @desc    Auth user & get token (Teacher)
const authTeacher = catchAsync(async (req, res, next) => {
    const { lreg, lpassword } = req.body;
    const user = await Teacher.findOne({ Tid: lreg });

    if (user && (await bcrypt.compare(lpassword, user.Password))) {
        res.json({
            status: 'ok',
            data: {
                _id: user._id,
                name: user.Name,
                tid: user.Tid,
                token: generateToken(user._id),
            },
        });
    } else {
        return next(new AppError('Invalid teacher ID or password', 401));
    }
});

// @desc    Update student password
const updateStudentPassword = catchAsync(async (req, res, next) => {
    const { reg, pass, password } = req.body;
    const user = await Student.findOne({ Reg: reg });

    if (user && (await bcrypt.compare(pass, user.Password))) {
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(password, salt);
        await user.save();
        res.json({ status: 'ok', message: 'Password updated' });
    } else {
        return next(new AppError('Old password incorrect', 401));
    }
});

// @desc    Update teacher password
const updateTeacherPassword = catchAsync(async (req, res, next) => {
    const { reg, pass, password } = req.body;
    const user = await Teacher.findOne({ Tid: reg });

    if (user && (await bcrypt.compare(pass, user.Password))) {
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(password, salt);
        await user.save();
        res.json({ status: 'ok', message: 'Password updated' });
    } else {
        return next(new AppError('Old password incorrect', 401));
    }
});

// @desc    Register a new teacher
const registerTeacher = catchAsync(async (req, res, next) => {
    const { name, tid, password, dept } = req.body;
    const existing = await Teacher.findOne({ Tid: tid });

    if (existing) {
        return next(new AppError("Teacher ID already registered.", 400));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const teacher = new Teacher({
        Name: name,
        Tid: tid,
        Password: hashedPassword,
        Dept: dept
    });

    await teacher.save();
    res.status(201).json({ status: 'ok', message: "Teacher account created successfully!" });
});

module.exports = {
    authStudent,
    authTeacher,
    updateStudentPassword,
    updateTeacherPassword,
    registerTeacher,
};
