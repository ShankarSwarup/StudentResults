const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const Student = require('../models/student');
const Teacher = require('../models/teacher');

// @desc    Auth user & get token (Student)
// @route   POST /api/users/student/login
const authStudent = async (req, res) => {
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
        res.status(401).json({ status: "err", message: 'Invalid registration number or password' });
    }
};

// @desc    Auth user & get token (Teacher)
// @route   POST /api/users/teacher/login
const authTeacher = async (req, res) => {
    const { lreg, lpassword } = req.body; // Tid is used as lreg in frontend
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
        res.status(401).json({ status: "err", message: 'Invalid teacher ID or password' });
    }
};

// @desc    Update student password
// @route   POST /api/users/student/password
const updateStudentPassword = async (req, res) => {
    const { reg, pass, password } = req.body;
    const user = await Student.findOne({ Reg: reg });

    if (user && (await bcrypt.compare(pass, user.Password))) {
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(password, salt);
        await user.save();
        res.json({ status: 'ok', message: 'Password updated' });
    } else {
        res.status(401).json({ status: "err", message: 'Old password incorrect' });
    }
};

// @desc    Update teacher password
// @route   POST /api/users/teacher/password
const updateTeacherPassword = async (req, res) => {
    const { reg, pass, password } = req.body; // Tid, old, new
    const user = await Teacher.findOne({ Tid: reg });

    if (user && (await bcrypt.compare(pass, user.Password))) {
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(password, salt);
        await user.save();
        res.json({ status: 'ok', message: 'Password updated' });
    } else {
        res.status(401).json({ status: "err", message: 'Old password incorrect' });
    }
};

// @desc    Register a new teacher
// @route   POST /api/v1/auth/teacher/register
const registerTeacher = async (req, res) => {
    const { name, tid, password, dept } = req.body;
    const existing = await Teacher.findOne({ Tid: tid });

    if (existing) {
        return res.status(400).json({ status: "err", message: "Teacher ID already registered." });
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
};

module.exports = {
    authStudent,
    authTeacher,
    updateStudentPassword,
    updateTeacherPassword,
    registerTeacher,
};
