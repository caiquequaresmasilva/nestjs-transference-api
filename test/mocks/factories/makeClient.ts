import { Client, ClientProps } from '@domain/Client';

export function makeClient(override: Partial<ClientProps> = {}) {
  return new Client({
    username: 'Default test username',
    password: 'DEFAULTTESTPASSWORD42',
    ...override,
  });
}
