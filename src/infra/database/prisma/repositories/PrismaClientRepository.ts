import { ClientRepository } from '@app/repositories';
import { Client } from '@domain/Client';
import { Injectable } from '@nestjs/common';
import { PrismaClientMapper } from '../mappers';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaClientRepository implements ClientRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findByUsername(username: string): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({
      where: { username },
      include: { account: true },
    });
    return client ? PrismaClientMapper.toDomain(client) : null;
  }
  async create(data: Client): Promise<void> {
    const raw = PrismaClientMapper.toPrisma(data);
    await this.prisma.client.create({
      data: raw,
    });
  }
}
