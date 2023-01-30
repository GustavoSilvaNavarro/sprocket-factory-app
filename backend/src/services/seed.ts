import fs from 'fs';
import path from 'path';

import { CompanySchema } from '@/models/schemas/company-schemas';
import { FactoriesSchema } from '@/models/schemas/factoryData-schema';
import { SprocketsSchema } from '@/models/schemas/sprocket-schema';

export const addCompanyData = async () => {
  try {
    const companiesData = fs.promises.readFile(path.join(__dirname, '../db/companies.json'), 'utf8');
    const factoryData = fs.promises.readFile(path.join(__dirname, '../db/factory-data.json'), 'utf8');
    const sprockets = fs.promises.readFile(path.join(__dirname, '../db/sprockets.json'), 'utf8');

    const [companiesTable, factoryTable, sprocketsTable] = await Promise.all([companiesData, factoryData, sprockets]);

    if (companiesTable && factoryTable && sprocketsTable) {
      const insertCompanyData = CompanySchema.bulkCreate(JSON.parse(companiesTable));
      const insertFactoryData = FactoriesSchema.bulkCreate(JSON.parse(factoryTable));
      const insertSprocketsData = SprocketsSchema.bulkCreate(JSON.parse(sprocketsTable));

      const [dataCompany, dataFactory, dataSprocket] = await Promise.allSettled([
        insertCompanyData,
        insertFactoryData,
        insertSprocketsData,
      ]);

      if (
        dataCompany.status === 'fulfilled' &&
        dataFactory.status === 'fulfilled' &&
        dataSprocket.status === 'fulfilled'
      ) {
        console.log('Data has been added successfully');
      }
    }
  } catch (err) {
    console.error(err);
  }
};
