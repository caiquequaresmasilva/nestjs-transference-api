import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MockedAppModule } from './mocks/mockedApp.module';

describe('AccountController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MockedAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/accounts (GET)', async () => {
    await request(app.getHttpServer()).post('/clients').send({
      username: 'Client 1',
      password: 'TESTpassword42',
    });
  });
});
