const express = require('express')
const {
    getStudents,
    getStudent,
    updateStudent

} = require('../controllers/studentController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all  routes
router.use(requireAuth)

// GET all students
router.get('/', getStudents)

// GET a student
router.get('/id', getStudent)

// UPDATE a student
router.patch('/:id', updateStudent)


module.exports = router