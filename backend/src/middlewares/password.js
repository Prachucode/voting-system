import {User} from '../models/usermodel.js'
import crypto from 'crypto'
import sendmail from '../utilities/email.js'
import jwt from 'jsonwebtoken'
const forgotpassword = async(req, res, next) => {

    // entering mail
    const user = User.findOne({email: req.body.email})
    if(!user) {
        next({
            message: 'error'
        })
    }
    //generating token
    const resettoken = user.passwordresettoken()
    await user.save() // adds the resettoken and resettokenexpirytiming fields in 

    const reseturl = `${req.protocol}://${req.get('host')}/passwords/resetpasswords/${resettoken}`
    //sending token to mail
    const message = `Please use the below url to reset the password \n${reseturl}`
    try{
        await sendmail({
            email: user.email,
            subject: 'Password change request',
            message: message
        })

        // if promise is fulfilled 
        res.status(400).json({
            message: 'password change url sent'
        })
    }catch(err){
        res.status(500).json({message: 'error sending mail'})

        user.passwordresettoken = undefined
        user.tokenexpirytiming = undefined
    }
}

const resetpassword = async(req, res, next) => {
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = User.findOne({resettoken : token, tokenexpirytiming: {$gt: Date.now()}})

    if(!user){
        next ({
            message: 'no user found'
        })
    }

    const {password, confirmpassword} = req.body;
    user.resettoken = undefined
    user.tokenexpirytiming = undefined
    user.passwordchangedtime = Date.now()

    await user.save() // saves the document as per above 

    // after password reset new jwt token will be generated

    const jwttoken = jwt.sign({id: user._id}, process.env.SECRET_STR,{ 
            expiry: process.env.expiresin
        })

    res.status(400).json({jwttoken, message: 'password changed and logged in'})
}

export {
    forgotpassword, resetpassword
}