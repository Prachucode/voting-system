import { Router } from 'express'
import {forgotpassword, resetpassword} from '../middlewares/password.js'
const router = Router()

router.route('/forgotpassword').post(forgotpassword)
router.route('/resetpassword:token').patch(resetpassword)

export default router
