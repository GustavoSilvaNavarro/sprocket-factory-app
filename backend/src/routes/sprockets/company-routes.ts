import { Router } from 'express';

import { createNewCompany } from '@/controllers/company-controllers';

const router = Router();

router.post('/', createNewCompany);

export default router;
