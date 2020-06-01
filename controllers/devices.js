const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Device = require('../Models/Device');

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
