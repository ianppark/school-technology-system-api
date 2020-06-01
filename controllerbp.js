const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc
// @route
// access
exports.get = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});

// @desc
// @route
// access
exports.get = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});

// @desc
// @route
// access
exports.create = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});

// @desc
// @route
// access
exports.update = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});

// @desc
// @route
// access
exports.delete = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});
