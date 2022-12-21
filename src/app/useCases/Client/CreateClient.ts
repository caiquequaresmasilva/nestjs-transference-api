import { HashService } from '@app/adapters';
import { InvalidFieldsError } from '@app/errors';
import { ClientRepository } from '@app/repositories';
import { Client } from '@domain/Client';
import { Injectable } from '@nestjs/common';

interface CreateClientRequest {
  username: string;
  password: string;
}

interface CreateClientResponse {
  client: Client;
}

@Injectable()
export class CreateClient {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly hashService: HashService,
  ) {}

  async execute(request: CreateClientRequest): Promise<CreateClientResponse> {
    const { password, username } = request;
    const client = await this.clientRepository.findByUsername(username);
    if (client) {
      throw new InvalidFieldsError('User already exists');
    }

    const newClient = new Client({
      username,
      password: this.hashService.genHash(password),
    });

    await this.clientRepository.create(newClient);
    return { client: newClient };
  }
}
