const Announcement = require('../models/announcementModel')
const mongoose = require('mongoose')

// get all announcements
const getAnnouncements = async (req, res) => {
    const announcements = await Announcement.find({}).sort({createdAt: -1})

    res.status(200).json(announcements)
}

// get a single announcement
const getAnnouncement = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No announcement found"})
    }

    const announcement = await Announcement.findById(id)

    if (!announcement) {
        return res.status(404).json({error: "No announcement found"})
    }

    res.status(200).json(announcement)
}

// create a new announcement
const createAnnouncement = async (req, res) => {
    const {classes, title, description} = req.body

    // add doc to db
    try { 
        const announcement = await Announcement.create({classes, title, description})
        res.status(200).json(announcement)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a Announcement
const deleteAnnouncement = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No announcement found"})
    }

    const announcement = await Announcement.findOneAndDelete({_id: id})

    if (!announcement) {
        return res.status(404).json({error: "No announcement found"})
    }

    res.status(200).json(announcement)
}

// update an announcement
const updateAnnouncement = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No Announcement found"})
    }

    const announcement = await Announcement.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!announcement) {
        return res.status(404).json({error: "No Announcement found"})
    }

    res.status(200).json(announcement)
}

module.exports = {
    getAnnouncement,
    getAnnouncements,
    createAnnouncement,
    deleteAnnouncement,
    updateAnnouncement
}