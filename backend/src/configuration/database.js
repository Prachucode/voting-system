import mongoose from "mongoose"

//connecting the server to database

const connectdb = async() => {
    try{
      const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
      console.log(`\n mongodb connected ${connectionInstance.connection.host}`)
    }
    catch(error){
      console.log("connection failed", error)
      process.exit(1)
    }
}
export default connectdb;