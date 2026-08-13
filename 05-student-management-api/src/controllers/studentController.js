const Student= require('../models/Student')

const createStudent= async (req, res, next)=>{
  try{
    const student = await Student.create(req.body);
    res.status(201).json({
      message: 'Student created successfully', student
    })
  } catch(error){
    next(error)
  }
}

const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      message: 'Students fetched successfully',
      students
    });
  } catch (error) {
    next(error)
  }
}

const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student === null) {
      return res.status(404).json({
        message: 'Student not found'
      });
    }
    res.status(200).json({
      message: 'Student fetched successfully',
      student
    });
  } catch (error) {
      next(error)
    }
};

const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if (student === null) {
      return res.status(404).json({
        message: 'Student not found'
      });
    }
    res.status(200).json({
      message: 'Student updated successfully',
      student
    });
  } catch (error) {
    next(error)
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (student === null) {
      return res.status(404).json({
        message: 'Student not found'
      });
    }
    res.status(200).json({
      message: 'Student deleted successfully',
      student
    });
  } catch (error) {
    next(error)
  }
};

module.exports= {createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent}