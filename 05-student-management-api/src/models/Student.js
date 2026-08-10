const mongoose= require('mongoose')

const studentSchema= new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  scholarNo: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },
  address: {
    type: String,
    required: true 
  },
  course: {
    type: String,
    required: true 
  },
  semester: {
    type: Number,
    required: true,
    min:1,
    max:8
  },
  section: {
    type: String,
    required: true 
  },
  dateOfBirth: {
    type: Date,
    required: true 
  },
  gender: {
    type: String,
    required: true 
  },
  yearOfAdmission: {
    type: Number,
    required: true 
  },
  status: {
    type: String,
    enum: ["active", "passout", "suspended"],
    required: true 
  },
})

module.exports = mongoose.model('Student', studentSchema)