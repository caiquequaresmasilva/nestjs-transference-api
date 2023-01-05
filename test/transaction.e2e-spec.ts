import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MockedAppModule } from './mocks/mockedApp.module';
import { InMemoryData } from './mocks/repositories/inMemoryData';

describe('TransactionController (e2e)', () => {
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
      username: 'Debited Client',
      password: 'TESTpassword42',
    });

    await request(appServer).post('/clients').send({
      username: 'Credited Client',
      password: 'TESTpassword42',
    });
    const {
      body: { token },
    } = await request(appServer).post('/auth/login').send({
      username: 'Debited Client',
      password: 'TESTpassword42',
    });
    authToken = token;
  });

  it('/transactions/cash-out (POST) Creates a transaction for an existing client', async () => {
    const res = await request(appServer)
      .post('/transactions/cash-out')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        amount: 30,
        toClientUsername: 'Credited Client',
      });

    expect(res.status).toBe(201);
    expect(res.body.transaction).toHaveProperty('id');
    expect(res.body.transaction).toHaveProperty('amount');
    expect(res.body.transaction).toHaveProperty('createdAt');
    expect(res.body.transaction).toHaveProperty('creditedAccountId');
    expect(res.body.transaction).toHaveProperty('debitedAccountId');
  });

  it('/transactions (GET) Return client transactions', async () => {
    await request(appServer)
      .post('/transactions/cash-out')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        amount: 30,
        toClientUsername: 'Credited Client',
      });

    const {
      body: { transactions },
    } = await request(appServer)
      .get('/transactions')
      .set('Authorization', `Bearer ${authToken}`);
    expect(transactions.length).toEqual(1);
  });
  it('/transactions/filter (GET) Return client transactions filtered', async () => {
    await request(appServer)
      .post('/transactions/cash-out')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        amount: 30,
        toClientUsername: 'Credited Client',
      });
    const {
      body: { token },
    } = await request(appServer).post('/auth/login').send({
      username: 'Credited Client',
      password: 'TESTpassword42',
    });
    await request(appServer)
      .post('/transactions/cash-out')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 10,
        toClientUsername: 'Debited Client',
      });

    const {
      body: { transactions },
    } = await request(appServer)
      .get('/transactions')
      .set('Authorization', `Bearer ${authToken}`);
    const {
      body: { transactions: cashOut },
    } = await request(appServer)
      .get('/transactions/filter?operation=cash-out')
      .set('Authorization', `Bearer ${authToken}`);
    const {
      body: { transactions: cashIn },
    } = await request(appServer)
      .get('/transactions/filter?operation=cash-in')
      .set('Authorization', `Bearer ${authToken}`);

    expect(transactions.length).toEqual(2);
    expect(cashOut.length).toEqual(1);
    expect(cashIn.length).toEqual(1);
  });
  it('/transactions/cash-out (POST) Return the correct error when client for cash-in does not exist', async () => {
    const { body } = await request(appServer)
      .post('/transactions/cash-out')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        amount: 30,
        toClientUsername: 'Fail Client',
      });
    expect(body).toEqual(
      expect.objectContaining({
        statusCode: 404,
        message: 'Client for cash-in not found',
      }),
    );
  });

  it('/transactions/cash-out (POST) Return the correct error when client for cash-out does not exist', async () => {
    InMemoryData.clients = InMemoryData.clients.filter(
      (item) => item.username !== 'Debited Client',
    );
    const { body } = await request(appServer)
      .post('/transactions/cash-out')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        amount: 30,
        toClientUsername: 'Credited Client',
      });
    expect(body).toEqual(
      expect.objectContaining({
        statusCode: 404,
        message: 'Client for cash-out not found',
      }),
    );
  });

  it('/transactions/cash-out (POST) Return the correct error when there is not sufficient balance for transaction', async () => {
    const { body } = await request(appServer)
      .post('/transactions/cash-out')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        amount: 200,
        toClientUsername: 'Credited Client',
      });
    expect(body).toEqual(
      expect.objectContaining({
        statusCode: 400,
        message: 'Insufficient balance',
      }),
    );
  });
  it('/transactions (GET) Return error message when auth token is not valid', async () => {
    const res = await request(appServer)
      .get('/transactions')
      .set('Authorization', 'Bearer fail-token');

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message', 'Unauthorized');
  });
});
