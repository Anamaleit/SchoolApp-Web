const Classes = require('../models/classesModel')
const mongoose = require('mongoose')

// get all classes
const getClasses = async (req, res) => {
    const classes = await Classes.find({}).sort({createdAt: -1})

    res.status(200).json(classes)
}

module.exports = {
    getClasses
}