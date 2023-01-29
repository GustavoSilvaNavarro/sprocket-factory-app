import { SprocketsSchema } from '@/models/schemas/sprocket-schema';
import { ISprocket } from '@/types/sprocket-types';
import { AppErrors, HttpStatusCode } from '@/helpers/app-error';
import { checkData } from '@/helpers/helper-functions';

export const addNewSprocketType = async (payload: ISprocket) => {
  const { teeth, pitch, pitch_diameter, outside_diameter } = payload;

  //? Check if the data is a number and is present
  if (checkData(teeth) || checkData(pitch) || checkData(pitch_diameter) || checkData(outside_diameter)) {
    throw new AppErrors({ message: 'Invalid data', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
  }

  const newSprocket = await SprocketsSchema.create({ ...payload });
  return newSprocket;
};

export const getAllSprockets = async () => {
  const allSprockets = await SprocketsSchema.findAll({ attributes: { exclude: ['id'] } });

  return allSprockets;
};

export const getSingleSprocket = async (idSprocket: string) => {
  const sprocketId = Number(idSprocket);

  if (checkData(sprocketId)) {
    throw new AppErrors({ message: 'Invalid ID', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
  }

  const sprocket = await SprocketsSchema.findOne({ where: { id: sprocketId }, attributes: { exclude: ['id'] } });

  if (!sprocket) {
    throw new AppErrors({ message: 'Sprocket does not exist', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
  }

  return sprocket;
};

export const updateSprocket = async (idSprocket: string, payload: ISprocket) => {
  const sprocketId = Number(idSprocket);

  if (checkData(sprocketId)) {
    throw new AppErrors({ message: 'Invalid ID', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
  }

  const sprocket = await SprocketsSchema.findOne({ where: { id: sprocketId } });

  if (sprocket) {
    sprocket.set(payload);
    await sprocket.save();
    return sprocket;
  }

  throw new AppErrors({ message: 'Sprocket does not exist', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
};
