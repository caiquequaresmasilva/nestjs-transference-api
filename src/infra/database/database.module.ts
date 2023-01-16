import {
  AccountRepository,
  ClientRepository,
  TransactionRepository,
} from '@app/repositories';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import {
  PrismaAccountRepository,
  PrismaClientRepository,
  PrismaTransactionRepository,
} from './prisma/repositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: ClientRepository,
      useClass: PrismaClientRepository,
    },
    {
      provide: AccountRepository,
      useClass: PrismaAccountRepository,
    },
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
  ],
  exports: [ClientRepository, AccountRepository, TransactionRepository],
})
export class DatabaseModule {}
