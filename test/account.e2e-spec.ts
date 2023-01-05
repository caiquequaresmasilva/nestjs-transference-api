import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MockedAppModule } from './mocks/mockedApp.module';
import { InMemoryData } from './mocks/repositories/inMemoryData';

describe('AccountController (e2e)', () => {
  let app: INestApplication;
  let appServer: any;
  let authToken: string;

  beforeEach(async () => {
    InMemoryData.clear();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MockedAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    appServer = app.getHttpServer();

    await request(appServer).post('/clients').send({
      username: 'Client 1',
      password: 'TESTpassword42',
    });

    const {
      body: { token },
    } = await request(appServer).post('/auth/login').send({
      username: 'Client 1',
      password: 'TESTpassword42',
    });
    authToken = token;
  });

  it('/accounts (GET) Return balance of an existing client', async () => {
    const res = await request(appServer)
      .get('/accounts')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('balance', 100);
  });

  it('/accounts (GET) Return error message when client does not exist', async () => {
    InMemoryData.accounts = [];
    const res = await request(appServer)
      .get('/accounts')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'Account not found');
  });
});
