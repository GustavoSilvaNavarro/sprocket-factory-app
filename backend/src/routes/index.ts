import { Router } from 'express';

import factoryRoutes from '@/routes/sprockets/factoryData-routes';
import sprocketRoutes from '@/routes/sprockets/sprocket-routes';
import companyRoutes from '@/routes/sprockets/company-routes';

const router = Router();

router.use('/factories', factoryRoutes);
router.use('/sprockets', sprocketRoutes);
router.use('/company', companyRoutes);

export default router;
