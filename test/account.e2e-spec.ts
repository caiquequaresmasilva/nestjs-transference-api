import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MockedAppModule } from './mocks/mockedApp.module';

describe('AccountController (e2e)', () => {
  let app: INestApplication;
  let appServer: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MockedAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    appServer = app.getHttpServer();
  });

  it('/accounts (GET) Return balance of an existing client', async () => {
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

    const res = await request(appServer)
      .get('/accounts')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('balance', 100);
  });
});
