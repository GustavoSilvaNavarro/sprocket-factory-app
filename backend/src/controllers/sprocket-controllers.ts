import { Request, Response, NextFunction } from 'express';

import { addNewSprocketType, getAllSprockets, getSingleSprocket, updateSprocket } from '@/models/daos/sprocket-daos';
import { ISprocket } from '@/types/sprocket-types';
import { ParamSprocket } from '@/types/route-types';

export const createNewSprocketType = async (
  req: Request<never, never, ISprocket>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newSprocket = await addNewSprocketType(req.body);

    return res.status(201).json(newSprocket);
  } catch (err) {
    console.error(err);
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
    console.error(err);
    next(err);
  }
};

export const retrieveSingleSprocket = async (req: Request<ParamSprocket>, res: Response, next: NextFunction) => {
  try {
    const sprocket = await getSingleSprocket(req.params.idSprocket);

    return res.status(200).json(sprocket);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const retrieveAllSprocket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allSprockets = await getAllSprockets();

    return res.status(200).json({ sprockets: allSprockets });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
