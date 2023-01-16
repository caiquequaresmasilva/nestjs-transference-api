import { InvalidFieldsError } from '@app/errors';
import { CreateClient } from '@app/useCases/Client';
import { Body, Controller, HttpException, Logger, Post } from '@nestjs/common';
import { ClientDTO } from '../dto';
import { ClientView } from '../view-models';

@Controller('clients')
export class ClientController {
  constructor(private readonly createCliente: CreateClient) {}
  private statusCode = 500;
  private readonly logger = new Logger(ClientController.name);

  @Post()
  async create(@Body() body: ClientDTO) {
    const { username, password } = body;
    try {
      const { client } = await this.createCliente.execute({
        username,
        password,
      });
      this.logger.log(`Client ${username} created`);
      return { client: ClientView.toHTTP(client) };
    } catch (e) {
      if (e instanceof InvalidFieldsError) {
        this.statusCode = 400;
      }
      this.logger.error((<Error>e).stack);
      throw new HttpException(
        (<Error>e).message || 'Internal server error',
        this.statusCode,
      );
    }
  }
}
