const express = require('express');
const {
  getStudent,
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/students');
const advancedResults = require('../middleware/advancedResults');
const Student = require('../Models/Student');

const router = express.Router();

router
  .route('/')
  .get(advancedResults(Student, 'devices'), getStudents)
  .post(createStudent);

router.route('/:id').get(getStudent).put(updateStudent).delete(deleteStudent);

module.exports = router;
