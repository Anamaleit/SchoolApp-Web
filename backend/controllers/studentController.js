const Students = require('../models/studentsModel')
const mongoose = require('mongoose')

// get all students
const getStudents = async (req, res) => {
    const students = await Students.find({}).sort({num: 1})

    res.status(200).json(students)
}

module.exports = {
    getStudents
}