import { Router } from 'express';

import { createNewCompany, getAllCompaniesDetails } from '@/controllers/company-controllers';

const router = Router();

router.post('/', createNewCompany);
router.get('/allCompanies', getAllCompaniesDetails);

export default router;
