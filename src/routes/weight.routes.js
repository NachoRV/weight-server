import { Router } from 'express'
// Midelewares
import { veriftToken } from '../midelewares/index.js'

import { getWeightById, getWeights, updateWeightById, deleteWeightById, createWeight } from '../controllers/weight.controller.js'
const router = Router()

router.get('/', veriftToken, getWeights)
router.get('/:weightId', veriftToken, getWeightById)
router.post('/', veriftToken, createWeight)
router.put('/:weightId', veriftToken, updateWeightById)
router.delete('/:weightId', veriftToken, deleteWeightById)

export default router
