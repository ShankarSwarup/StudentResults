const express = require('express');
const { addSubject, manageSubject, findSubjects, uploadResults, editSubject, getAllSubjects, updateResultsManual, getStudentResults, deleteSubject, getSemesterResults } = require('../controllers/academicController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/subject', protect, adminOnly, addSubject);
router.post('/manage', protect, adminOnly, manageSubject);
router.post('/find', protect, findSubjects);
router.post('/results-upload', protect, adminOnly, uploadResults);
router.post('/edit-subject', protect, adminOnly, editSubject);
router.post('/delete-subject', protect, adminOnly, deleteSubject);
router.get('/all-subjects', protect, getAllSubjects);
router.post('/update-results', protect, adminOnly, updateResultsManual);
router.post('/get-results', protect, getStudentResults);
router.post('/get-semester-results', protect, getSemesterResults);

module.exports = router;
