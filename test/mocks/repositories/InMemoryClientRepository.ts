import { ClientRepository } from '@app/repositories';
import { Client } from '@domain/Client';
import { InMemoryData } from './inMemoryData';

export class InMemoryClientRepository implements ClientRepository {
  async findByUsername(username: string): Promise<Client | null> {
    const client = InMemoryData.clients.find(
      (item) => item.username === username,
    );
    if (!client) {
      return null;
    }
    return client;
  }
  async create(data: Client): Promise<void> {
    InMemoryData.clients.push(data);
    InMemoryData.accounts.push(data.account);
  }
}
