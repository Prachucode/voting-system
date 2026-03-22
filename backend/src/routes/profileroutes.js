import { Router } from 'express'
import {registeruser, loginuser, getprofile} from '../controllers/profilecontroller.js'
import protect from '../middlewares/jwtauth.js'
const router = Router()

router.route('/registeruser').post(registeruser)
router.route('/login').post(loginuser)
router.route('/profile').get(protect, getprofile) // protected route

export default router