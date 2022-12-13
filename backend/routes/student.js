const express = require('express')
const {
    getStudents,

} = require('../controllers/studentController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all  routes
router.use(requireAuth)

// GET all students
router.get('/', getStudents)

module.exports = router