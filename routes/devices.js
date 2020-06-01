const express = require('express');
const {
  getDevice,
  getDevices,
  createDevice,
  updateDevice,
  deleteDevice,
} = require('../controllers/devices');
const advancedResults = require('../middleware/advancedResults');
const Device = require('../Models/Device');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(Device, {
      path: 'student',
      select: 'firstName lastName grade',
    }),
    getDevices
  )
  .post(createDevice);

router.route('/:id').get(getDevice).put(updateDevice).delete(deleteDevice);

module.exports = router;
