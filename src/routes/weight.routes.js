import { Router } from 'express';
const router = Router();

import { getWeightById, getWeights, updateWeightById, deleteWeightById, createWeight} from '../controllers/weight.controller.js';

router.get('/', getWeights)
router.get('/:weightId', getWeightById)
router.post('/', createWeight)
router.put('/:weightId', updateWeightById)
router.delete('/:weightId', deleteWeightById)

export default router;