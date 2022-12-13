const mongoose = require('mongoose');

const baseSchema = require('../../frontend/src/shared/base-schema/student.js');

const schema = new mongoose.Schema(baseSchema.schema);

module.exports = mongoose.model('Students', schema);