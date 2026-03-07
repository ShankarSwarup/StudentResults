const express = require('express');
const { addStudent, addTeacher, findStudents, findStudentByReg, uploadStudentsExcel, addStudentLink, deleteStudent } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/student', protect, adminOnly, addStudent);
router.post('/teacher', protect, adminOnly, addTeacher);
router.post('/find', protect, findStudents);
router.post('/find-by-reg', protect, findStudentByReg);
router.post('/excel-upload', protect, adminOnly, uploadStudentsExcel);
router.post('/add-link', protect, addStudentLink);
router.post('/delete-student', protect, adminOnly, deleteStudent);

module.exports = router;
