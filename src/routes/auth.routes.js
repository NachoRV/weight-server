import { Router } from 'express'

import { singIn, singUp } from '../controllers/auth.controller.js'
// import { isAdmin, veriftToken } from '../midelewares/authjwt.js'
const router = Router()

router.post('/singin', singIn)
router.post('/singup', singUp)
// router.post('/singup', [veriftToken, isAdmin], singUp)

export default router
