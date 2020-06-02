const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Device = require('../Models/Device');
const AssignmentRecord = require('../Models/AssignmentRecord');
const Student = require('../Models/Student');

// @desc    Get all devices
// @route   GET /api/v1/devices
// access   Private
exports.getDevices = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single device
// @route   GET /api/v1/devices/:id
// access   Private
exports.getDevice = asyncHandler(async (req, res, next) => {
  const device = await Device.findById(req.params.id);

  if (!device) {
    return next(
      new ErrorResponse(`No device found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: device });
});

// @desc    Create new device
// @route   POST /api/v1/devices
// access   Private
exports.createDevice = asyncHandler(async (req, res, next) => {
  const device = await Device.create(req.body);

  res.status(201).json({ success: true, data: device });
});

// @desc    Update existing device
// @route   PUT /api/v1/devices/:id
// access   Private
exports.updateDevice = asyncHandler(async (req, res, next) => {
  const device = await Device.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!device) {
    return next(
      new ErrorResponse(`No device found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: device });
});

// @desc    Remove device from database
// @route   DELETE /api/v1/devices/:id
// access   Private
exports.deleteDevice = asyncHandler(async (req, res, next) => {
  const device = await Device.findById(req.params.id);

  if (!device) {
    return next(
      new ErrorResponse(`No device found with id of ${req.params.id}`, 404)
    );
  }

  device.remove();
  res.status(200).json({ success: true, data: {} });
});

// @desc    Checkout device to student
// @route   POST /api/v1/devices/:id/checkout
// access   Private
exports.checkoutDevice = asyncHandler(async (req, res, next) => {
  const { studentId } = req.body;

  // Check to make sure a student id was provided
  if (!studentId) {
    return next(
      new ErrorResponse(
        `Please select a student to check the device out to`,
        401
      )
    );
  }

  // Find Device in database
  const device = await Device.findById(req.params.id);

  if (!device) {
    return next(
      new ErrorResponse(`No device found with id of ${deviceId}`, 404)
    );
  }

  // Ensure device is not already checked out
  if (device.student) {
    return next(
      new ErrorResponse(`This device is already assigned to ${device.student}`)
    );
  }

  // Ensure supplied student id matches to a valid student in the database
  const student = await Student.findById(studentId);

  if (!student) {
    return next(
      new ErrorResponse(`No student found with id of ${studentId}`, 404)
    );
  }

  // Set student field on device to supplied student id
  device.student = student._id;
  await device.save();

  // Create assignment record
  const assignment = await AssignmentRecord.create({
    student: student._id,
    device: device._id,
    checkedOutBy: req.user,
  });

  res.status(201).json({
    success: true,
    data: {
      student,
      device,
      assignment,
    },
  });
});

// @desc    Check device in from student
// @route   PUT /api/v1/devices/:id/checkin
// access   Private
exports.checkinDevice = asyncHandler(async (req, res, next) => {
  const device = await Device.findById(req.params.id);

  if (!device) {
    return next(
      new ErrorResponse(`No device found with id of ${deviceId}`, 404)
    );
  }

  const assignment = await AssignmentRecord.findOne({
    device: device._id,
    student: device.student,
    checkinDate: undefined,
  });

  if (!assignment) {
    return next(
      new ErrorResponse(
        'No assignment that matches the device/student found',
        404
      )
    );
  }

  device.student = undefined;
  await device.save();

  assignment.checkinDate = Date.now();
  assignment.checkedInBy = req.user._id;
  await assignment.save();

  res.status(200).json({
    success: true,
    data: {
      assignment,
      device,
    },
  });
});
