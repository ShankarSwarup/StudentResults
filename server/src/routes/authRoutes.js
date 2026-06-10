const express = require('express');
const {
    authStudent,
    authTeacher,
    updateStudentPassword,
    updateTeacherPassword,
    registerTeacher,
} = require('../controllers/authController');
const validate = require('../middleware/validator');
const { loginSchema, updatePasswordSchema, registerTeacherSchema } = require('../validations/authValidation');

const router = express.Router();

router.post('/student/login', validate(loginSchema), authStudent);
router.post('/teacher/login', validate(loginSchema), authTeacher);
router.post('/teacher/register', validate(registerTeacherSchema), registerTeacher);
router.post('/student/password', validate(updatePasswordSchema), updateStudentPassword);
router.post('/teacher/password', validate(updatePasswordSchema), updateTeacherPassword);

module.exports = router;
