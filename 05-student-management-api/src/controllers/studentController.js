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

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      message: 'Students fetched successfully',
      students
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch students',
      error: error.message
    });
  }
}

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json({
      message: 'Student fetched successfully',
      student
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch student',
      error: error.message
    });
  }
};

module.exports= {createStudent, getAllStudents, getStudentById}