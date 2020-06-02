const mongoose = require('mongoose');

const AssignmentRecordSchema = new mongoose.Schema({});

module.exports = mongoose.model('AssignmentRecord', AssignmentRecordSchema);
