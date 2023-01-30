import { Router } from 'express';

import {
  createNewSprocketType,
  updateSprocketType,
  retrieveSingleSprocket,
  retrieveAllSprocket,
} from '@/controllers/sprocket-controllers';

const router = Router();

router.post('/new', createNewSprocketType);
router.get('/data', retrieveAllSprocket);
router.get('/data/:idSprocket', retrieveSingleSprocket);
router.put('/data/:idSprocket', updateSprocketType);

export default router;
