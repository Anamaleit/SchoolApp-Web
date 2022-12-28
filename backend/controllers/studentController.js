const Generic = require('./genericController')
const Students = require('../models/studentsModel')
const mongoose = require('mongoose')

// get all students
const getStudents = async (req, res) => {
    
    let students;
    const isAdmin = (req.user.isAdmin !== undefined && req.user.isAdmin === true);
    const isTeacher = (req.user.isTeacher !== undefined && req.user.isTeacher === true);
    if (isTeacher || isAdmin){
        students = await Students.find({}).sort({num: 1})
    }
    else{
        const canViewSome = (req.user.viewableStudents !== undefined && req.user.viewableStudents.length > 0);
        if (canViewSome){
            const viewableStudents = (req.user.viewableStudents !== undefined) ? req.user.viewableStudents : [];
            students = await Students.find({'_id': { $in: viewableStudents}}).sort({num: 1})
        }
        else{
            return res.status(400).json({error: 'not authorized to view any students currently'})
        }
    }

    res.status(200).json(students)
}

// get a student
const getStudent = async (req, res) => {
    
    // permissions check
    if (req.user === undefined){
        return res.status(400).json({error: 'authentication error'})
    }
    const isAdmin = (req.user.isAdmin !== undefined && req.user.isAdmin === true);
    const isTeacher = (req.user.isTeacher !== undefined && req.user.isTeacher === true);
    const canView = (req.user.viewableStudents !== undefined && req.user.viewableStudents.includes(req.params.id));
    const ok = (isTeacher || canView || isAdmin);
    if (!ok){
        return res.status(400).json({error: 'not permitted to view this student'})
    }
    
    await Generic.getOne(req,res,Students,"student");
}

// update a student
const updateStudent = async (req, res) => {
    
    // permissions check
    const isAdmin = (req.user.isAdmin !== undefined && req.user.isAdmin === true);
    const isTeacher = (req.user.isTeacher !== undefined && req.user.isTeacher === true);
    if (!isTeacher || !isAdmin){
        return res.status(400).json({error: 'not permitted to edit any students'})
    }
    
    await Generic.update(req,res,Students,"student");
}

// create a student
const createStudent = async (req, res) => {
    
    // permissions check
    const isAdmin = (req.user.isAdmin !== undefined && req.user.isAdmin === true);
    const isTeacher = (req.user.isTeacher !== undefined && req.user.isTeacher === true);
    if (!isTeacher || !isAdmin){
        return res.status(400).json({error: 'not permitted to create any students'})
    }
    
    await Generic.create(req,res,Students,"student");
}

// delete a student
const deleteStudent = async (req, res) => {
    
    // permissions check
    const isAdmin = (req.user.isAdmin !== undefined && req.user.isAdmin === true);
    const isTeacher = (req.user.isTeacher !== undefined && req.user.isTeacher === true);
    if (!isTeacher || !isAdmin){
        return res.status(400).json({error: 'not permitted to delete any students'})
    }
    
    await Generic.delete(req,res,Students,"student");
}



module.exports = {
    getStudents,
    getStudent,
    updateStudent,
    createStudent,
    deleteStudent
}