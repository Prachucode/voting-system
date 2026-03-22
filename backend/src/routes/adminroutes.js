import { Router } from 'express'
import {createelector, updateelector, deleteelector} from '../controllers/candidatecontroller.js'
const router = Router()

router.route('/registerelector').post(createelector)
router.route('/updateelector/:id').put(updateelector)
router.route('/deleteelector/:id').post(deleteelector)

export default router