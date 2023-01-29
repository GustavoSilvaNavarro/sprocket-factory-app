import { FactoriesSchema } from '@/models/schemas/factoryData-schema';
import { CompanySchema } from '@/models/schemas/company-schemas';
import { checkData } from '@/helpers/helper-functions';
import { IFactoryData } from '@/types/sprocket-types';
import { AppErrors, HttpStatusCode } from '@/helpers/app-error';

export const postNewFactoryData = async (idFactory: string, payload: IFactoryData) => {
  const factoryId = Number(idFactory);
  const { sprocket_production_actual, sprocket_production_goal } = payload;

  if (checkData(sprocket_production_actual) || checkData(sprocket_production_goal) || checkData(factoryId)) {
    throw new AppErrors({ message: 'Data must be numbers', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
  }

  const companyExist = await CompanySchema.findOne({ where: { id: factoryId } });

  if (companyExist) {
    const newData = await FactoriesSchema.create({ ...payload, factoryId });
    return newData;
  }

  throw new AppErrors({ message: 'Company does not exist', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
};
