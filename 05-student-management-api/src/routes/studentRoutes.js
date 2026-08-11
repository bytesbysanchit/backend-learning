const {createStudent, getAllStudents, getStudentById}= require('../controllers/studentController')
const express= require('express')
const router= express.Router()

router.post('/', createStudent)
router.get('/', getAllStudents)
router.get('/:id', getStudentById)

module.exports= router