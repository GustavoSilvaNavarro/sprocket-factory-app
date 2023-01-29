import { Request, Response, NextFunction } from 'express';

import { addCompany } from '@/models/daos/company-daos';
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
