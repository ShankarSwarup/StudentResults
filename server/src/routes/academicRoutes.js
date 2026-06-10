const express = require('express');
const router = express.Router();
const { addSubject, manageSubject, findSubjects, uploadResults, editSubject, getAllSubjects, updateResultsManual, getStudentResults, deleteSubject, getSemesterResults } = require('../controllers/academicController');
const { protect, teacherOnly } = require('../middleware/authMiddleware');
const validate = require('../middleware/validator');
const { addSubjectSchema, manageSubjectSchema, findSubjectsSchema } = require('../validations/academicValidation');
const multer = require('multer');
const upload = multer();

router.post('/add-subject', protect, teacherOnly, validate(addSubjectSchema), addSubject);
router.post('/manage-subject', protect, teacherOnly, validate(manageSubjectSchema), manageSubject);
router.post('/find-subjects', protect, validate(findSubjectsSchema), findSubjects);
router.post('/upload-results', protect, teacherOnly, upload.single('file'), uploadResults);
router.post('/edit-subject', protect, teacherOnly, editSubject);
router.get('/subjects', protect, getAllSubjects);
router.post('/update-results-manual', protect, teacherOnly, updateResultsManual);
router.post('/get-results', protect, getStudentResults);
router.post('/delete-subject', protect, teacherOnly, deleteSubject);
router.post('/get-semester-results', protect, getSemesterResults);

module.exports = router;
