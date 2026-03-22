import { Router } from 'express'
import {readelectors, castvote, readvotecount} from '../controllers/votecontroller.js'
import protect from '../middlewares/jwtauth.js' // use protect before the actual route to protect with jwt auth
const router = Router()

router.route('/read').get(readelectors)
router.route('/vote/:id').post(protect , castvote)
router.route('/votecount').get(protect, readvotecount)

export default router