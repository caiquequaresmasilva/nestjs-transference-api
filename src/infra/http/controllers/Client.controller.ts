import { InvalidFieldsError } from '@app/errors';
import { CreateClient } from '@app/useCases/Client';
import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ClientDTO } from '../dto';
import { ClientView } from '../view-models';

@Controller('clients')
export class ClientController {
  constructor(private readonly createCliente: CreateClient) {}

  @Post()
  async create(@Body() body: ClientDTO) {
    const { username, password } = body;
    try {
      const { client } = await this.createCliente.execute({
        username,
        password,
      });
      return { client: ClientView.toHTTP(client) };
    } catch (e) {
      let statusCode = 500;
      if (e instanceof InvalidFieldsError) {
        statusCode = 400;
      }
      throw new HttpException(
        (<Error>e).message || 'Internal server error',
        statusCode,
      );
    }
  }
}
