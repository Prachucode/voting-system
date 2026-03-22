import {User} from '../models/usermodel.js'
import jwt from 'jsonwebtoken' 
const registeruser = async(req, res) => {
    const {email, aadharnumber, password, role} = req.body;
try{
    if(!email||!aadharnumber || !password || !role) {
        return res.status(400).json({message : 'enter all the details'})
    }

    const user = await User.findOne({
        email, aadharnumber
    })

    if(user) {
        return res.status(400).json({message: 'already registered'})
    }
    const createduser = await User.create({
        aadharnumber,
        password,
        role
    })

    //generates the token when sign up
    const jwttoken = jwt.sign({id: createduser._id}, process.env.SECRET_STR,{ 
        expiry: process.env.expiresin
    })

    res.status(201).json({message: 'registered', createduser, jwttoken})
}catch(error){
    res.status(500).json({message: 'internal server error'})
}

}

// login functionality

const loginuser = async(req,res) => {
    try {
        const {aadharnumber, password} = req.body;
        
        const user = await User.findOne({aadharnumber})

        if(!user) return res.status(400).json({message: 'user not found'})

        // instance method for password hashing 
        const check = await user.passwordcheck(password)

        if(!check) return res.status(400).json({message: 'wrong credentials'})
        
        const jwttoken = jwt.sign({id: user._id}, process.env.SECRET_STR,{ 
        expiry: process.env.expiresin
    })
        res.status(200).json({message: 'logged in', user, jwttoken})

    } catch (error) {
       res.status(500).json({message: 'internal server error'})   
    }
}

// get profile details

const getprofile = async(req,res) => {
    try {
        const user = await User.find()

        res.status.json(200).json({user})
    }
    catch (error) {
       res.status(500).json({message: 'internal server error'})  
    }
}

export {
    registeruser, loginuser, getprofile
}