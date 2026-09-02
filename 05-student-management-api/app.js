const express= require('express')
const app= express()
const studentRoutes= require('./src/routes/studentRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const authRoutes = require('./src/routes/authRoutes');

app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/students', studentRoutes)
app.use(errorHandler)

module.exports= app