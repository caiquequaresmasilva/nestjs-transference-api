import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { MockedAppModule } from './mocks/mockedApp.module';

describe('ClientController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MockedAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/clients (POST): Client created', () => {
    return request(app.getHttpServer())
      .post('/clients')
      .send({
        username: 'Client test 1',
        password: 'TESTPassword42',
      })
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            client: expect.objectContaining({
              id: expect.any(String),
              username: 'Client test 1',
              accountId: expect.any(String),
            }),
          }),
        );
      });
  });
  it('/clients (POST): Validation error when the client data is in wrong format', () => {
    return request(app.getHttpServer())
      .post('/clients')
      .send({
        username: 'Cl',
        password: 'TE',
      })
      .expect(400)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining([
              expect.any(String),
              expect.any(String),
            ]),
            statusCode: 400,
            error: 'Bad Request',
          }),
        );
      });
  });

  it('/clients (POST): Validation error when the client already exists', () => {
    return request(app.getHttpServer())
      .post('/clients')
      .send({
        username: 'Client 1',
        password: 'TESTclient42',
      })
      .expect(201)
      .then(() => {
        return request(app.getHttpServer())
          .post('/clients')
          .send({
            username: 'Client 1',
            password: 'TESTclient42',
          })
          .expect(400)
          .then((res) => {
            expect(res.body).toEqual(
              expect.objectContaining({
                statusCode: 400,
                message: 'User already exists',
              }),
            );
          });
      });
  });
});
