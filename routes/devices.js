const express = require('express');
const {
  getDevice,
  getDevices,
  createDevice,
  updateDevice,
  deleteDevice,
  checkoutDevice,
  checkinDevice,
} = require('../controllers/devices');
const advancedResults = require('../middleware/advancedResults');
const Device = require('../Models/Device');

const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(Device, {
      path: 'student',
      select: 'firstName lastName grade',
    }),
    protect,
    getDevices
  )
  .post(protect, createDevice);

router
  .route('/:id')
  .get(protect, getDevice)
  .put(protect, updateDevice)
  .delete(protect, deleteDevice);

router.route('/:id/checkout').post(protect, checkoutDevice);

router.route('/:id/checkin').put(protect, checkinDevice);

module.exports = router;
