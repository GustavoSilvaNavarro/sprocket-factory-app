import { Sequelize } from 'sequelize';

import { FactoriesSchema } from '@/models/schemas/factoryData-schema';
import { CompanySchema } from '@/models/schemas/company-schemas';
import { checkData } from '@/helpers/helper-functions';
import { IFactoryData, AllFactoryData, IDataList, IFactoryList } from '@/types/sprocket-types';
import { AppErrors, HttpStatusCode } from '@/helpers/app-error';

const isCompanyFound = async (factoryId: number) => {
  return await CompanySchema.findOne({ where: { id: factoryId } });
};

export const postNewFactoryData = async (idFactory: string, payload: IFactoryData) => {
  const factoryId = Number(idFactory);
  const { sprocket_production_actual, sprocket_production_goal } = payload;

  if (checkData(sprocket_production_actual) || checkData(sprocket_production_goal) || checkData(factoryId)) {
    throw new AppErrors({ message: 'Data must be numbers', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
  }

  const companyExist = await isCompanyFound(factoryId);

  if (companyExist) {
    const newData = await FactoriesSchema.create({ ...payload, factoryId });
    return newData;
  }

  throw new AppErrors({ message: 'Company does not exist', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
};

export const getSingleData = async (idFactory: string) => {
  const factoryId = Number(idFactory);
  if (checkData(factoryId)) {
    throw new AppErrors({ message: 'Invalid ID', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
  }

  const companyExist = await isCompanyFound(factoryId);

  if (!companyExist) {
    throw new AppErrors({ message: 'Company does not exist', httpCode: HttpStatusCode.BAD_REQUEST, code: 3 });
  }

  const dataByFactoryId = (await FactoriesSchema.findAll({
    where: { factoryId },
    attributes: { exclude: ['id', 'factoryId'] },
  })) as unknown as Array<IFactoryData>;

  const result = {} as { chart_data: IFactoryList };

  //? Looping through the array to shape the data
  while (dataByFactoryId.length > 0) {
    const data = dataByFactoryId.pop(); //? decreasing the size of the array
    if (!data) break;

    if (Object.prototype.hasOwnProperty.call(result, 'chart_data')) {
      //* if the property exist push their values to the object
      result.chart_data.sprocket_production_actual.push(data.sprocket_production_actual);
      result.chart_data.sprocket_production_goal.push(data.sprocket_production_goal);
      result.chart_data.time.push(data.time);
    } else {
      //? If it does not exist create object
      result['chart_data'] = {
        sprocket_production_actual: [data.sprocket_production_actual],
        sprocket_production_goal: [data.sprocket_production_goal],
        time: [data.time],
      };
    }
  }

  return { factory: result };
};

export const getAllFactoryData = async () => {
  const factoryData = (await FactoriesSchema.findAll({
    raw: true,
    attributes: { exclude: ['id'], include: [[Sequelize.col('company.name'), 'name']] },
    include: {
      model: CompanySchema,
      as: 'company',
      attributes: { exclude: ['id', 'name'] },
    },
  })) as unknown as Array<IDataList>;

  const result = {} as AllFactoryData;

  //? Looping through the array to shape the data
  while (factoryData.length > 0) {
    const data = factoryData.pop(); //? decreasing the size of the array
    if (!data) break;

    if (Object.prototype.hasOwnProperty.call(result, data.name)) {
      //? if the property exist push their values to the object
      result[`${data.name}`].factory.chart_data.sprocket_production_actual.push(data.sprocket_production_actual);
      result[`${data.name}`].factory.chart_data.sprocket_production_goal.push(data.sprocket_production_goal);
      result[`${data.name}`].factory.chart_data.time.push(data.time);
    } else {
      //? If it does not exist create object
      result[`${data.name}`] = {
        factory: {
          chart_data: {
            sprocket_production_actual: [data.sprocket_production_actual],
            sprocket_production_goal: [data.sprocket_production_goal],
            time: [data.time],
          },
        },
      };
    }
  }

  return { factories: Object.values(result) };
};
