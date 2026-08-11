const express= require('express')
const app= express()
const studentRoutes= require('./src/routes/studentRoutes')

app.use(express.json());

app.use('/api/students', studentRoutes)

module.exports= app