const Product= require('../models/product')

const getAllProducts= async(req, res)=>{
  const myData= await Product.find({})
  res.status(200).json({myData})
}
const getAllProductsTesting= async(req, res)=>{
  res.status(200).json({msg: "I getAllProductsTesting"})
}

module.exports= {getAllProducts, getAllProductsTesting}