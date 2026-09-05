const User= require('../models/User')
const bcrypt = require('bcrypt')

const register= async(req, res, next)=>{
  try{
    const {name, email, password}= req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user= await User.create({
      name,
      email,
      password: hashedPassword
    })

    const userData = user.toObject();
    delete userData.password;
    

    res.status(201).json({
      message: 'User registered successfully',
      user: userData
    });

  } catch(error){
    next(error);
  }
}


const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user === null) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

  } catch (error) {
    next(error);
  }
};


module.exports= {register}