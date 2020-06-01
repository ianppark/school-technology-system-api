const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: true,
    },
    firstName: {
      type: String,
      required: [true, 'Please add first name'],
    },
    middleName: String,
    lastName: {
      type: String,
      required: [true, 'Please add last name'],
    },
    username: {
      type: String,
      lowercase: true,
      unique: true,
    },
    emailAddress: {
      type: String,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
      unique: true,
    },
    password: String,
    classOf: {
      type: Number,
      required: [true, 'Please add class of'],
    },
    studentNumber: {
      type: String,
      required: [true, 'Please add student number'],
      unique: true,
    },
    stateStudentNumber: {
      type: String,
    },
    aup: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: String,
      default: false,
    },
    insured: {
      type: Boolean,
      default: false,
    },
    insuranceExpiry: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

StudentSchema.virtual('devices', {
  ref: 'Device',
  localField: '_id',
  foreignField: 'student',
  justOne: false,
});

module.exports = mongoose.model('Student', StudentSchema);
