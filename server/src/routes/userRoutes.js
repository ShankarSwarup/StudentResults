const express = require('express');
const router = express.Router();
const { addStudent, addTeacher, findStudents, findStudentByReg, uploadStudentsExcel, addStudentLink, deleteStudent } = require('../controllers/userController');
const { protect, teacherOnly } = require('../middleware/authMiddleware');
const validate = require('../middleware/validator');
const { addStudentSchema, addTeacherSchema } = require('../validations/userValidation');
const multer = require('multer');
const upload = multer();

router.post('/add-student', protect, teacherOnly, validate(addStudentSchema), addStudent);
router.post('/add-teacher', protect, teacherOnly, validate(addTeacherSchema), addTeacher);
router.post('/find', protect, findStudents);
router.post('/find-one', protect, findStudentByReg);
router.post('/upload-excel', protect, teacherOnly, upload.single('file'), uploadStudentsExcel);
router.post('/add-link', protect, teacherOnly, addStudentLink);
router.post('/delete-student', protect, teacherOnly, deleteStudent);

module.exports = router;
