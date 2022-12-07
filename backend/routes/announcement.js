const express = require('express')
const {
    createAnnouncement,
    getAnnouncement,
    getAnnouncements,
    deleteAnnouncement,
    updateAnnouncement
} = require('../controllers/announcementController')

const router = express.Router()

// GET all announcements
router.get('/', getAnnouncements)

// GET a single announcement
router.get('/:id', getAnnouncement)

// POST a new announcement
router.post('/', createAnnouncement)

// DELETE an announcement
router.delete('/:id', deleteAnnouncement)

// UPDATE an announcement
router.patch('/:id', updateAnnouncement)

module.exports = router