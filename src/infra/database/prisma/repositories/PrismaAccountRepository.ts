import { AccountRepository } from '@app/repositories';
import { Account } from '@domain/Account';
import { Injectable } from '@nestjs/common';
import { PrismaAccountMapper } from '../mappers';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAccountRepository implements AccountRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(id: string): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: {
        id,
      },
    });
    return account ? PrismaAccountMapper.toDomain(account) : null;
  }
}
