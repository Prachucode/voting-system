import jwt from 'jsonwebtoken'
import util from util
import {User} from '../models/usermodel'
const protect = async(req, res, next) => {

    // get the token from the header part for validation
    // authorization is a custom header needed for protecting routes 
    const testtoken = req.headers.authorization
    let token;
    if(testtoken && testtoken.startsWith('bearer')){
        token = testtoken.split(' ')[1];
    }
    //check if token exist or not
    if(!token){
        return res.status(400).json({message: 'Log in first'})
    }
    const decodetoken = await util.promisify(jwt.verify(token, process.env.SECRET_STR))

    // decodetoken will have the payload -> if correct
    // it will also contain iat & exp *
    const user = await User.findById(decodetoken.id)
    
    // validating the token
    if(!user) return res.status(400).json({message: 'user doesnot exist'})
    
    //if every parameter is working 
    next();
}

export default protect