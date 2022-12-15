const mongoose = require('mongoose');

const baseSchema = require('../../frontend/src/shared/base-schema/student.js');

// strict:throw makes it so that telltale warning signs are reported instead of silently ignored.
const schema = new mongoose.Schema(baseSchema.schema, {"strict": "throw"});

module.exports = mongoose.model('Students', schema);