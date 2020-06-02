const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../Models/User');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Private
exports.register = asyncHandler(async (req, res, next) => {
  // Create user
  const user = await User.create({
    ...req.body,
  });

  sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  // validate email and password
  if (!username || !password) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check for user
  const user = await User.findOne({ username }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Get logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, data: user });
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJWT();

  res.status(statusCode).json({ success: true, token });
};
