const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Student = require('../Models/Student');

// @desc    Get all students
// @route   GET /api/v1/students
// access   Private
exports.getStudents = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single student by id
// @route   GET /api/v1/students/:id
// access   Private
exports.getStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.id).populate('devices');

  if (!student) {
    return next(
      new ErrorResponse(`No student found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: student });
});

// @desc    Create new student in database
// @route   POST /api/v1/students
// access   Private
exports.createStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.create(req.body);

  res.status(201).json({ success: true, data: student });
});

// @desc    Update student in database
// @route   PUT /api/v1/students/:id
// access   Private
exports.updateStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!student) {
    return next(
      new ErrorResponse(`No student found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: student });
});

// @desc    Remove student from database
// @route   DELETE /api/v1/students/:id
// access   Private
exports.deleteStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return next(
      new ErrorResponse(`Student not found with id ${req.params.id}`, 404)
    );
  }

  student.remove();

  res.status(200).json({ success: true, data: {} });
});
