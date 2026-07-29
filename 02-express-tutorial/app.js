const express= require('express')
let {people}= require('./data')

const app= express()

app.use(express.static('./methods-public'))

app.get('/api/people', (req, res)=>{
  res.status(200).json({success:true, data:people})
})

app.listen(5000, ()=>{
  console.log('server is listening on port 5000....');
})