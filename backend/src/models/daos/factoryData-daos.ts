import { FactoriesSchema } from '@/models/schemas/factoryData-schema';
import { checkFactoryData } from '@/helpers/helper-functions';
import { IFactoryData } from '@/types/sprocket-types';
import { AppErrors, HttpStatusCode } from '@/helpers/app-error';

export const postNewFactoryData = async (payload: IFactoryData) => {
  const { sprocket_production_actual, sprocket_production_goal } = payload;

  if (checkFactoryData(sprocket_production_actual, sprocket_production_goal)) {
    throw new AppErrors({ message: 'Fields must be numbers', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
  }

  const newData = await FactoriesSchema.create(payload);
  return newData;
};
