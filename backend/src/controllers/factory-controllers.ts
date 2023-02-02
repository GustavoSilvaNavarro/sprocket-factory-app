import { Request, Response, NextFunction } from 'express';

import { postNewFactoryData, getSingleData, getAllFactoryData } from '@/models/daos/factoryData-daos';
import { IFactoryData } from '@/types/sprocket-types';
import { IParamFactory } from '@/types/route-types';
import { logger } from '@/utils/loggers';
import { AppErrors } from '@/helpers/app-error';

export const createNewFactoryData = async (
  req: Request<IParamFactory, never, IFactoryData>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newData = await postNewFactoryData(req.params.idFactory, req.body);
    return res.status(201).json(newData);
  } catch (err) {
    logger.error((err as AppErrors).message);
    next(err);
  }
};

export const retrieveFactoriesData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getAllFactoryData();

    return res.status(200).json(result);
  } catch (err) {
    logger.error((err as AppErrors).message);
    next(err);
  }
};

export const retrieveSingleFactoryData = async (req: Request<IParamFactory>, res: Response, next: NextFunction) => {
  try {
    const data = await getSingleData(req.params.idFactory);

    return res.status(200).json(data);
  } catch (err) {
    logger.error((err as AppErrors).message);
    next(err);
  }
};
