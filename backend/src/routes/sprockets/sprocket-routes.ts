import { Router } from 'express';

import {
  createNewSprocketType,
  updateSprocketType,
  retrieveSingleSprocket,
  retrieveAllSprocket,
  createProductType,
} from '@/controllers/sprocket-controllers';

const router = Router();

router.post('/product-type', createProductType);
router.post('/new/:idProduct', createNewSprocketType);
router.get('/data', retrieveAllSprocket);
router.get('/data/:idSprocket', retrieveSingleSprocket);
router.put('/data/:idSprocket', updateSprocketType);

export default router;
