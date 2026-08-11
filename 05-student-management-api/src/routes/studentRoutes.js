const {createStudent}= require('../controllers/studentController')
const express= require('express')
const router= express.Router()

router.post('/', createStudent)

module.exports= router