import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { MockedAppModule } from './mocks/mockedApp.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let appServer: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MockedAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    appServer = app.getHttpServer();
  });

  it('/auth/login (POST): Login client successfully', async () => {
    await request(appServer).post('/clients').send({
      username: 'Client 1',
      password: 'TESTpassword42',
    });
    const res = await request(appServer).post('/auth/login').send({
      username: 'Client 1',
      password: 'TESTpassword42',
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('/auth/login (POST): Validate login input', async () => {
    const res = await request(appServer).post('/auth/login').send({
      username: 'Fail Client',
      password: 'TESTpassword42',
    });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message', 'Unauthorized');
  });
});
