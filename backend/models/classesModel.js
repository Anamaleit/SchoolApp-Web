const mongoose = require('mongoose');

const baseSchema = require('../../frontend/src/shared/base-schema/class.js');

const schema = new mongoose.Schema(baseSchema.schema, { timestamps: true });

module.exports = mongoose.model('Classes', schema);