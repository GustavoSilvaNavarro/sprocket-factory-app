import { Router } from 'express';

import {
  createNewFactoryData,
  retrieveFactoriesData,
  retrieveSingleFactoryData,
} from '@/controllers/factory-controllers';

const router = Router();

router.get('/data', retrieveFactoriesData);
router.post('/new-data/:idFactory', createNewFactoryData);
router.get('/data/:idFactory', retrieveSingleFactoryData);

export default router;
