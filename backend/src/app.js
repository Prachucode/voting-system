import express from "express"

const app = express() // create a express app
//routes import 
app.use(express.json())

import profileroutes from './routes/profileroutes.js'
import voterroutes from './routes/voterroutes.js'
import adminroutes from './routes/adminroutes.js'
import passwords from './routes/passwordroutes.js'
// route for voter
app.use('/vote', voterroutes)
// route for admin
app.use('/admin', adminroutes)
// route for profile
app.use('/profile', profileroutes)
//route for passwords 
app.use('/passwords', passwords)

export default app