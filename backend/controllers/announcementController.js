const Generic = require('./genericController')
const Announcement = require('../models/announcementModel')
const mongoose = require('mongoose')

// get all announcements
const getAnnouncements = async (req, res) => {
    await Generic.getAll(req,res,Announcement,"announcement");
}

// get a single announcement
const getAnnouncement = async (req, res) => {
    await Generic.getOne(req,res,Announcement,"announcement");
}

// create a new announcement
const createAnnouncement = async (req, res) => {
    const {classes, title, description} = req.body

    let emptyFields = []

    if (!classes) {
        emptyFields.push('classes')
    }
    if (!title) {
        emptyFields.push('title')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

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
    await Generic.delete(req,res,Announcement,"announcement");
}

// update an announcement
const updateAnnouncement = async (req, res) => {
    await Generic.update(req,res,Announcement,"announcement");
}

module.exports = {
    getAnnouncement,
    getAnnouncements,
    createAnnouncement,
    deleteAnnouncement,
    updateAnnouncement
}