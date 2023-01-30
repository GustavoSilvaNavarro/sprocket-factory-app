import { Router } from 'express';

import {
  createNewFactoryData,
  retrieveFactoriesData,
  retrieveSingleFactoryData,
  getFactoriesDetails,
} from '@/controllers/factory-controllers';

const router = Router();

router.get('/data', retrieveFactoriesData);
router.post('/new-data/:idFactory', createNewFactoryData);
router.get('/data/:idFactory', retrieveSingleFactoryData);
router.get('/factory-details', getFactoriesDetails);

export default router;
