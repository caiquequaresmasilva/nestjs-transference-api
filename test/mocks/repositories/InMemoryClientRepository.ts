import { ClientRepository } from '@app/repositories';
import { Client } from '@domain/Client';

export class InMemoryClientRepository implements ClientRepository {
  public clients: Client[] = [];
  async findByUsername(username: string): Promise<Client | null> {
    const client = this.clients.find((item) => item.username === username);
    if (!client) {
      return null;
    }
    return client;
  }
  async create(data: Client): Promise<void> {
    this.clients.push(data);
  }
}
