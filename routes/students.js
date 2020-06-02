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

const { protect } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(advancedResults(Student, 'devices'), protect, getStudents)
  .post(protect, createStudent);

router
  .route('/:id')
  .get(protect, getStudent)
  .put(protect, updateStudent)
  .delete(protect, deleteStudent);

module.exports = router;
