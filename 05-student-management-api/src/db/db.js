const dns= require('dns')
// Force Google DNS
dns.setServers(['8.8.8.8'])

const mongoose= require('mongoose')

const uri= process.env.MONGODB_URL

const connectDB= async ()=>{
    console.log("Connecting...")
    const conn = await mongoose.connect(uri)
    console.log(`✅ MongoDB Connected`)
    return conn
}

module.exports= connectDB