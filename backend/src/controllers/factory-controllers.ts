import { Request, Response, NextFunction } from 'express';

import { postNewFactoryData } from '@/models/daos/factoryData-daos';
import { IFactoryData } from '@/types/sprocket-types';

export const createNewFactoryData = async (
  req: Request<never, never, IFactoryData>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newData = await postNewFactoryData(req.body);
    return res.status(201).json(newData);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const retrieveFactoriesData = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ msg: 'Hello World Gustavo' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const retrieveSingleFactoryData = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ msg: 'Yooo' });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
