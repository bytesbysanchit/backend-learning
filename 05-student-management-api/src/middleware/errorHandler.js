const errorHandler= (error, req, res, next)=>{
  if (error.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid student ID'
    });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Invalid student data'
    });
  }
  if (error.code === 11000) {
    return res.status(409).json({
      message: 'Student with this scholar number or email already exists'
    });
  }
  res.status(500).json({
    message: 'Internal server error'
  });
}

module.exports= errorHandler