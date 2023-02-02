import 'dotenv/config';
import { Request } from 'express';
import { describe, beforeAll, afterEach, expect, test, afterAll } from '@jest/globals';
import supertest from 'supertest';

import serverConnection from '../src/server/server';
import { sequelize } from '../src/models/connectionDb';
import { CompanySchema } from '../src/models/schemas/company-schemas';
import { ICompany } from '../src/types/sprocket-types';
import { AppErrors } from '../src/helpers/app-error';

const { app } = serverConnection;

describe('Integration / Unit tests for factory data endpoints', () => {
  const request = supertest(app);

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await CompanySchema.destroy({ where: {}, force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST Endpoint /company', () => {
    test('Should add a new company to the database', async () => {
      const newCompany = { name: 'Energy Company' };
      const res = (await request.post('/company').send(newCompany)) as unknown as Request<never, never, ICompany>;

      expect(res.statusCode).toBe(201);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(res.body.name).toEqual(newCompany.name);
      expect(res.body.id).toBe(1);
    });

    test('Should throw an error if name property is not present or is not a string type', async () => {
      try {
        const invalidCOmpany = { name: 26562662 };

        await request.post('/company').send(invalidCOmpany);
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).status).toBe(400);
        expect((err as AppErrors).message).toMatch(/Name must be a string and can not be empty/);
      }
    });
  });
});
