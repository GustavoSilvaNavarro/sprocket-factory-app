import 'dotenv/config';
import { Request } from 'express';
import { describe, beforeAll, afterEach, expect, test, afterAll } from '@jest/globals';
import supertest from 'supertest';

import serverConnection from '../src/server/server';
import { sequelize } from '../src/models/connectionDb';
import { FactoriesSchema } from '../src/models/schemas/factoryData-schema';
import { CompanySchema } from '../src/models/schemas/company-schemas';
import { listOfFactoryDetails, invalidFactoryData } from '../__mocks__/factoryData-mocks';
import { listOfCompanies } from '../__mocks__/company-mocks';
import { AppErrors } from '../src/helpers/app-error';
import { IFactoryData, IFactoryList } from '../src/types/sprocket-types';

const { app } = serverConnection;

describe('Integration / Unit tests for factory data endpoints', () => {
  const request = supertest(app);

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await FactoriesSchema.destroy({ where: {}, force: true });
    await CompanySchema.destroy({ where: {}, force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('Post /factories/new-data/:idFactory', () => {
    test('Should add new factory data related to a company', async () => {
      const company = await CompanySchema.create(listOfCompanies[0]);
      const res = (await request
        .post(`/factories/new-data/${company.getDataValue('id')}`)
        .send(listOfFactoryDetails[2])) as unknown as Request<never, never, IFactoryData>;

      expect(res.statusCode).toBe(201);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(res.body.factoryId).toBe(company.getDataValue('id'));
      expect(res.body.sprocket_production_actual).toBe(listOfFactoryDetails[2].sprocket_production_actual);
      expect(res.body.sprocket_production_goal).toBe(listOfFactoryDetails[2].sprocket_production_goal);
    });

    test('Should throw an error if company does not exist', async () => {
      try {
        await request.post('/factories/new-data/1').send(listOfFactoryDetails[2]);
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).status).toBe(400);
        expect((err as AppErrors).message).toMatch(/Company does not exist/);
      }
    });

    test('Should throw an error if properties are not numbers', async () => {
      try {
        const company = await CompanySchema.create(listOfCompanies[0]);

        await request.post(`/factories/new-data/${company.getDataValue('id')}`).send(invalidFactoryData);
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).status).toBe(400);
        expect((err as AppErrors).message).toMatch(/Company does not exist/);
      }
    });
  });

  describe('GET /factories/data/:idFactory', () => {
    test('Should retrieve factory data for a given id', async () => {
      await CompanySchema.bulkCreate(listOfCompanies);
      await FactoriesSchema.bulkCreate(listOfFactoryDetails);

      const res = (await request.get('/factories/data/2')) as unknown as Request<
        never,
        never,
        { factory: { chart_data: IFactoryList } }
      >;

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(res.body.factory.chart_data.sprocket_production_actual.length).toBe(3);
      expect(res.body.factory.chart_data.sprocket_production_goal.length).toBe(3);
      expect(res.body.factory.chart_data.time.length).toBe(3);
    });

    test('Should throw an error when id is invalid', async () => {
      try {
        await request.get('/factories/data/invalidId');
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).status).toBe(400);
        expect((err as AppErrors).message).toMatch(/Invalid ID/);
      }
    });

    test('Should throw an error when company does not exist', async () => {
      try {
        await request.get('/factories/data/1');
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).status).toBe(400);
        expect((err as AppErrors).message).toMatch(/Company does not exist/);
      }
    });
  });

  describe('GET /factories/data', () => {
    test('Should retrieve all factory data', async () => {
      await CompanySchema.bulkCreate(listOfCompanies);
      await FactoriesSchema.bulkCreate(listOfFactoryDetails);

      const res = (await request.get('/factories/data')) as unknown as Request<
        never,
        never,
        { factories: Array<{ factory: { chart_data: IFactoryList } }> }
      >;

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(res.body.factories.length).toBe(3);
    });
  });
});
