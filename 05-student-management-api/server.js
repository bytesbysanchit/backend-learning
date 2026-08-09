require('dotenv').config()
const app= require('./app')
const connectDB= require('./src/db/db')

const start= async()=>{
  try{
    await connectDB()
    app.listen(5000, ()=>{
      console.log('app is listening on port 5000');
    })
  } catch (error) {
      console.error(error);
    }
}

start()

