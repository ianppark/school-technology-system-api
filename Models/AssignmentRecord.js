const mongoose = require('mongoose');

const AssignmentRecordSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.ObjectId,
    ref: 'Student',
    required: [true, 'Please add student who the device is being assigned to'],
  },
  device: {
    type: mongoose.Schema.ObjectId,
    ref: 'Device',
    required: [true, 'Please add device that is being assigned'],
  },
  checkoutDate: {
    type: Date,
    default: Date.now,
  },
  checkinDate: Date,
  checkedOutBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please add user responsible for this check out'],
  },
  checkedInBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('AssignmentRecord', AssignmentRecordSchema);
