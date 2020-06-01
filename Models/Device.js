const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: true,
  },
  description: String,
  modelNumber: {
    type: String,
    required: [true, 'Please add device model number'],
  },
  operatingSystem: String,
  serialNumber: {
    type: String,
    required: [true, 'Please add device serial number'],
    unique: true,
  },
  assetTag: {
    type: String,
    required: [true, 'Please add device asset tag number'],
    unique: true,
  },
  rfidTag: {
    type: String,
    unique: true,
  },
  student: {
    type: mongoose.Schema.ObjectId,
    ref: 'Student',
  },
  isLoaner: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Device', DeviceSchema);
