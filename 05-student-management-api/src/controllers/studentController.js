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
    console.log(req.query);
    const allowedFilters = [
      'course',
      'semester',
      'section',
      'gender',
      'status'
    ];

    const operatorMap = {
      gt: '$gt',
      gte: '$gte',
      lt: '$lt',
      lte: '$lte',
      ne: '$ne'
    };

    const allowedSortFields = [
      'name',
      'course',
      'semester',
      'section',
      'yearOfAdmission'
    ]

    const filters = {};
    allowedFilters.forEach((field) => {
      if (req.query[field]) {
        const value = req.query[field];

        if (value.includes(',')) {
          filters[field] = {
            $in: value.split(',')
          };
        } else {
          filters[field] = value;
        }
      }
    });

    Object.keys(req.query).forEach((key) => {
      const match = key.match(/^(.+)\[(gt|gte|lt|lte|ne)\]$/);

      if (!match) return;

      const field = match[1];
      const operator = match[2];

      if (!allowedFilters.includes(field)) return;

      filters[field] = {
        [operatorMap[operator]]: Number(req.query[key])
      };
    });

    if (req.query.or) {
      const conditions = req.query.or.split(',');

      const orConditions = conditions
        .map((condition) => {
          const [field, value] = condition.split(':');

          if (!allowedFilters.includes(field)) {
            return null;
          }

          return {
            [field]: value
          };
        })
        .filter(condition => condition !== null);

      if (orConditions.length > 0) {
        filters.$or = orConditions;
      }
    }
    
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = Student.find(filters);

    // Sorting
    if (req.query.sort) {
      const sortFields = req.query.sort.split(',');

      const sortObject = {};

      sortFields.forEach((field) => {
        let sortField = field;
        let sortOrder = 1;

        if (field.startsWith('-')) {
          sortField = field.substring(1);
          sortOrder = -1;
        }

        if (allowedSortFields.includes(sortField)) {
          sortObject[sortField] = sortOrder;
        }
      });

      query = query.sort(sortObject);
    }
    query = query.skip(skip).limit(limit);

    const students = await query;

    const totalStudents = await Student.countDocuments(filters);
    const totalPages = Math.ceil(totalStudents / limit);

    res.status(200).json({
      message: 'Students fetched successfully',
      students,
      page,
      limit,
      totalStudents,
      totalPages
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