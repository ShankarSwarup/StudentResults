const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const config = require('../config/config');

const protect = catchAsync(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, config.jwtSecret);

        // Try to find student first, then teacher
        req.user = await Student.findById(decoded.id).select('-Password') ||
            await Teacher.findById(decoded.id).select('-Password');

        if (!req.user) {
            return next(new AppError('The user belonging to this token no longer exists.', 401));
        }

        next();
    } else {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }
});

const adminOnly = (req, res, next) => {
    if (req.user && req.user.Tid) { // Teachers have Tid, Students have Reg
        next();
    } else {
        return next(new AppError('You do not have permission to perform this action', 403));
    }
};

module.exports = { protect, adminOnly, teacherOnly: adminOnly };
