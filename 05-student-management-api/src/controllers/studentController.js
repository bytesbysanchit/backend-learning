const Student= require('../models/Student')

const createStudent= async (req, res)=>{
  try{
    const student = await Student.create(req.body);
    res.status(201).json({
      message: 'Student created successfully', student
    })
  } catch(error){
    res.status(500).json({
      message: "Failed to create student",
      error: error.message
    });
  }
}

module.exports= {createStudent}