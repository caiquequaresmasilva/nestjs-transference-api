import { Client } from './Client';

describe('Client domain entity', () => {
  it('Should be able to create a client with an account', () => {
    const client = new Client({
      username: 'Teste Username',
      password: 'testPassword',
    });
    expect(client).toBeTruthy();
    expect(client.account).toBeTruthy();
  });
});
