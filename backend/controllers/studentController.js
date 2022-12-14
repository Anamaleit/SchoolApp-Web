const Generic = require('./genericController')
const Students = require('../models/studentsModel')
const mongoose = require('mongoose')

// get all students
const getStudents = async (req, res) => {
    const students = await Students.find({}).sort({num: 1})

    res.status(200).json(students)
}

// get a student
const getStudent = async (req, res) => {
    await Generic.getOne(req,res,Students,"student");
}

// update a student
const updateStudent = async (req, res) => {
    await Generic.update(req,res,Students,"student");
}

module.exports = {
    getStudents,
    getStudent,
    updateStudent
}