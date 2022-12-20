import { Client } from '@domain/Client';

export abstract class ClientRepository {
  abstract findByUsername(username: string): Promise<Client | null>;
  abstract create(data: Client): Promise<void>;
}
