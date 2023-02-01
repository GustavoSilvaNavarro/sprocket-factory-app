import 'dotenv/config';
import { Request } from 'express';
import { describe, beforeAll, afterEach, expect, test, afterAll } from '@jest/globals';
import supertest from 'supertest';

import serverConnection from '../src/server/server';
import { sequelize } from '../src/models/connectionDb';
import { SprocketsSchema } from '../src/models/schemas/sprocket-schema';
import { AppErrors } from '../src/helpers/app-error';
import { ISprocket } from '../src/types/sprocket-types';
import { invalidSprocket, listOfSprockets } from '../__mocks__/sprocket-mocks';

const { app } = serverConnection;

describe('Unit tests for sprocket api Sprocket Routes', () => {
  const request = supertest(app);

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await SprocketsSchema.destroy({ where: {}, force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('Post /sprockets/new', () => {
    test('Should return new sprocket with status 201', async () => {
      const res = (await request.post('/sprockets/new').send(listOfSprockets[0])) as unknown as Request<
        never,
        never,
        ISprocket
      >;

      expect(res.statusCode).toBe(201);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(res.body.id).toBeDefined();
      expect(res.body.teeth).toBe(listOfSprockets[0].teeth);
      expect(res.body.outside_diameter).toBe(listOfSprockets[0].outside_diameter);
      expect(res.body.pitch_diameter).toBe(listOfSprockets[0].pitch_diameter);
      expect(res.body.pitch).toBe(listOfSprockets[0].pitch);
    });

    test('Should return status code 400 and throw an error when properties are not numbers', async () => {
      try {
        await request.post('/sprockets/new').send(invalidSprocket);
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).status).toBe(400);
      }
    });
  });

  describe('GET all sprockets /sprockets/data', () => {
    test('Should retrieve list of sprockets', async () => {
      await SprocketsSchema.bulkCreate(listOfSprockets);

      const res = (await request.get('/sprockets/data')) as unknown as Request<
        never,
        never,
        { sprockets: Array<ISprocket> }
      >;

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(res.body.sprockets.length).toBe(3);
    });

    test('Should return an empty array when there is no sprockets', async () => {
      const res = (await request.get('/sprockets/data')) as unknown as Request<
        never,
        never,
        { sprockets: Array<ISprocket> }
      >;

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(res.body.sprockets.length).toBe(0);
    });
  });

  describe('Get single sprocket /sprockets/data/:idSprocket', () => {
    test('Should return a single sprocket', async () => {
      const sprocket = await SprocketsSchema.create(listOfSprockets[1]);

      const res = (await request.get(`/sprockets/data/${sprocket.getDataValue('id')}`)) as unknown as Request<
        never,
        never,
        ISprocket
      >;

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(res.body.teeth).toBe(listOfSprockets[1].teeth);
      expect(res.body.pitch_diameter).toBe(listOfSprockets[1].pitch_diameter);
      expect(res.body.outside_diameter).toBe(listOfSprockets[1].outside_diameter);
      expect(res.body.pitch).toBe(listOfSprockets[1].pitch);
    });

    test('Should throw an error if id is invalid', async () => {
      try {
        await request.get(`/sprockets/data/sprocket`);
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).message).toMatch(/Invalid ID/);
      }
    });

    test('Should throw an error if sprocket does not exist', async () => {
      try {
        await request.get(`/sprockets/data/1`);
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).message).toMatch(/Sprocket does not exist/);
      }
    });
  });

  describe('PUT route /sprockets/data/:idSprocket', () => {
    test('Should update sprocket info for a given id', async () => {
      const sprocket = await SprocketsSchema.create(listOfSprockets[0]);

      const res = (await request
        .put(`/sprockets/data/${sprocket.getDataValue('id')}`)
        .send(listOfSprockets[2])) as unknown as Request<never, never, ISprocket>;

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(res.body.teeth).toBe(listOfSprockets[2].teeth);
      expect(res.body.outside_diameter).toBe(listOfSprockets[2].outside_diameter);
      expect(res.body.pitch_diameter).toBe(listOfSprockets[2].pitch_diameter);
      expect(res.body.pitch).toBe(listOfSprockets[2].pitch);
    });

    test('Should throw an error if id is invalid', async () => {
      try {
        await request.put(`/sprockets/data/sprocket`).send(listOfSprockets[2]);
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).message).toMatch(/Invalid ID/);
      }
    });

    test('Should throw an error if sprocket does not exist', async () => {
      try {
        await request.put(`/sprockets/data/1`).send(listOfSprockets[2]);
      } catch (err) {
        expect(err).toBeInstanceOf(AppErrors);
        expect((err as AppErrors).message).toMatch(/Sprocket does not exist/);
      }
    });
  });
});
