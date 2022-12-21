import { Client } from '@domain/Client';

export class ClientView {
  static toHTTP(client: Client) {
    return {
      id: client.id,
      username: client.username,
      accountId: client.account.id,
    };
  }
}
