const express = require('express');
const {
    authStudent,
    authTeacher,
    updateStudentPassword,
    updateTeacherPassword,
    registerTeacher,
} = require('../controllers/authController');

const router = express.Router();

router.post('/student/login', authStudent);
router.post('/teacher/login', authTeacher);
router.post('/teacher/register', registerTeacher);
router.post('/student/password', updateStudentPassword);
router.post('/teacher/password', updateTeacherPassword);

module.exports = router;
