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
    await Generic.create(req,res,Announcement,"announcement");
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