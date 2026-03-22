import dotenv from "dotenv"
import connectdb from "./configuration/database.js"
import app from "./app.js"

dotenv.config({
    path: './.env'
})

const startserver = async() => {
    try{
     await connectdb()
     app.on("error", (error) => {
        console.log("ERROR", error);
        throw error
     })

     app.listen(process.env.PORT || 8000, () => {
        console.log(`Server running on port: ${process.env.PORT}`)
     })
    } catch(error){
     console.log("Mongodb connection failed", error);
    }
}

startserver();