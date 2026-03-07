const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const Teacher = require('../models/teacher');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

            // Try to find student first, then teacher
            req.user = await Student.findById(decoded.id).select('-Password') ||
                await Teacher.findById(decoded.id).select('-Password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ status: "err", message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ status: "err", message: 'Not authorized, no token' });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user && req.user.Tid) { // Teachers have Tid, Students have Reg
        next();
    } else {
        res.status(403).json({ status: "err", message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, adminOnly };
