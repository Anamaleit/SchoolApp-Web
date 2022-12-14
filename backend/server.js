require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const announcementRoutes = require('./routes/announcement')
const classesRoutes = require('./routes/classes')
const userRoutes = require('./routes/user')
const studentRoutes = require('./routes/student')

//express
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})

//routes
app.use('/api/announcements',announcementRoutes)
app.use('/api/classes', classesRoutes)
app.use('/api/user', userRoutes)
app.use('/api/students', studentRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    // listen for request
    app.listen(process.env.PORT, () =>{
        console.log('connecting to db & listening on port', process.env.PORT)
    })

    })
    .catch((error) => {
        console.log(error);
    })