const express = require('express')
const {
    getClasses
} = require('../controllers/classesController')

const router = express.Router()

// GET all classes
router.get('/', getClasses)

module.exports = router