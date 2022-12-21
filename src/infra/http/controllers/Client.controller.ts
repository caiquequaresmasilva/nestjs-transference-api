import { CreateClient, LoginClient } from '@app/useCases/Client';
import { Body, Controller, Post } from '@nestjs/common';
import { ClientDTO } from '../dto';
import { ClientView } from '../view-models';

@Controller('clients')
export class ClientController {
  constructor(
    private readonly createCliente: CreateClient,
    private readonly loginClient: LoginClient,
  ) {}

  @Post('login')
  async login(@Body() body: ClientDTO) {
    const { username, password } = body;
    const { token } = await this.loginClient.execute({ username, password });
    return { token };
  }

  @Post()
  async create(@Body() body: ClientDTO) {
    const { username, password } = body;
    const { client } = await this.createCliente.execute({ username, password });
    return { client: ClientView.toHTTP(client) };
  }
}
