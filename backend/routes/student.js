const express = require('express')
const {
    getStudents,
    getStudent,
    updateStudent,
    createStudent,
    deleteStudent

} = require('../controllers/studentController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all  routes
router.use(requireAuth)

// GET all students
router.get('/', getStudents)

// GET a student
router.get('/:id', getStudent)

// UPDATE a student
router.patch('/:id', updateStudent)

// POST a new student
router.post('/', createStudent)

// DELETE a student
router.delete('/:id', deleteStudent)

module.exports = router