const getAllProducts= async(req, res)=>{
  res.status(200).json({msg: "I getAllProducts"})
}
const getAllProductsTesting= async(req, res)=>{
  res.status(200).json({msg: "I getAllProductsTesting"})
}

module.exports= {getAllProducts, getAllProductsTesting}