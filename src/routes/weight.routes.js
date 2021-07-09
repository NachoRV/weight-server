import { Router } from 'express'

import { getWeightById, getWeights, updateWeightById, deleteWeightById, createWeight } from '../controllers/weight.controller.js'
const router = Router()

router.get('/', getWeights)
router.get('/:weightId', getWeightById)
router.post('/', createWeight)
router.put('/:weightId', updateWeightById)
router.delete('/:weightId', deleteWeightById)

export default router
