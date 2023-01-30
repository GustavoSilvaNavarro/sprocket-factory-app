import { Request, Response, NextFunction } from 'express';

import { addCompany, allCompanyDetails } from '@/models/daos/company-daos';
import { ICompany } from '@/types/sprocket-types';

export const createNewCompany = async (req: Request<never, never, ICompany>, res: Response, next: NextFunction) => {
  try {
    const newFactory = await addCompany(req.body);
    return res.status(201).json(newFactory);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getAllCompaniesDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companies = await allCompanyDetails();
    return res.status(200).json(companies);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
