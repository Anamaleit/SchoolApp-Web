const mongoose = require('mongoose')

const Schema = mongoose.Schema

const classesSchema = new Schema({
  name: {
    type: Array,
    required: true
  },
  teachers: {
    type: Array,
    required: true
  },
  students: {
    type: Array,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Classes', classesSchema)