import { CreateClient, LoginClient } from '@app/useCases/Client';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateClientDTO } from '../dto';
import { ClientView } from '../view-models';

@Controller('clients')
export class ClientController {
  constructor(
    private readonly createCliente: CreateClient,
    private readonly loginClient: LoginClient,
  ) {}

  @Post()
  async create(@Body() body: CreateClientDTO) {
    const { username, password } = body;
    const { client } = await this.createCliente.execute({ username, password });
    return { client: ClientView.toHTTP(client) };
  }
}
