import { Request, Response, NextFunction } from 'express';

import { addCompany, allCompanyDetails } from '@/models/daos/company-daos';
import { ICompany } from '@/types/sprocket-types';
import { AppErrors } from '@/helpers/app-error';
import { logger } from '@/utils/loggers';

export const createNewCompany = async (req: Request<never, never, ICompany>, res: Response, next: NextFunction) => {
  try {
    const newFactory = await addCompany(req.body);
    return res.status(201).json(newFactory);
  } catch (err) {
    logger.error((err as AppErrors).message);
    next(err);
  }
};

export const getAllCompaniesDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companies = await allCompanyDetails();
    return res.status(200).json(companies);
  } catch (err) {
    logger.error((err as AppErrors).message);
    next(err);
  }
};
