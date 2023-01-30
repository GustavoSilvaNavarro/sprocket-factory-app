import { SprocketsSchema } from '@/models/schemas/sprocket-schema';
import { ProductSchema } from '@/models/schemas/productType-schema';
import { ISprocket, ProductType } from '@/types/sprocket-types';
import { AppErrors, HttpStatusCode } from '@/helpers/app-error';
import { checkData } from '@/helpers/helper-functions';

export const addNewSprocketType = async (idProduct: string, payload: ISprocket) => {
  const productId = Number(idProduct);
  const { teeth, pitch, pitch_diameter, outside_diameter } = payload;

  //? Check if the data is a number and is present
  if (
    checkData(teeth) ||
    checkData(pitch) ||
    checkData(pitch_diameter) ||
    checkData(outside_diameter) ||
    checkData(productId)
  ) {
    throw new AppErrors({ message: 'Invalid data', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
  }

  const productExist = await ProductSchema.findOne({ where: { id: productId } });

  if (!productExist) {
    throw new AppErrors({ message: 'Product does not exist', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
  }

  const newSprocket = await SprocketsSchema.create({ ...payload, productTypeId: productId });
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

export const addProductType = async (payload: ProductType) => {
  if (!payload.name || typeof payload.name !== 'string') {
    throw new AppErrors({
      message: 'Name must be a string and can not be empty',
      httpCode: HttpStatusCode.BAD_REQUEST,
      code: 3,
    });
  }

  const newProduct = await ProductSchema.create({ ...payload });
  return newProduct;
};
