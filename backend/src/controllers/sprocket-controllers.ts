import { Request, Response, NextFunction } from 'express';

import { addNewSprocketType, getAllSprockets, getSingleSprocket, updateSprocket } from '@/models/daos/sprocket-daos';
import { ISprocket } from '@/types/sprocket-types';
import { ParamSprocket } from '@/types/route-types';
import { logger } from '@/utils/loggers';
import { AppErrors } from '@/helpers/app-error';

export const createNewSprocketType = async (
  req: Request<never, never, ISprocket>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newSprocket = await addNewSprocketType(req.body);

    return res.status(201).json(newSprocket);
  } catch (err) {
    logger.error((err as AppErrors).message);
    next(err);
  }
};

export const updateSprocketType = async (
  req: Request<ParamSprocket, never, ISprocket>,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedSprocket = await updateSprocket(req.params.idSprocket, req.body);

    return res.status(200).json(updatedSprocket);
  } catch (err) {
    logger.error((err as AppErrors).message);
    next(err);
  }
};

export const retrieveSingleSprocket = async (req: Request<ParamSprocket>, res: Response, next: NextFunction) => {
  try {
    const sprocket = await getSingleSprocket(req.params.idSprocket);

    return res.status(200).json(sprocket);
  } catch (err) {
    logger.error((err as AppErrors).message);
    next(err);
  }
};

export const retrieveAllSprocket = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const allSprockets = await getAllSprockets();

    return res.status(200).json({ sprockets: allSprockets });
  } catch (err) {
    logger.error((err as AppErrors).message);
    next(err);
  }
};
