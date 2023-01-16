import {
  AccountRepository,
  ClientRepository,
  TransactionRepository,
} from '@app/repositories';
import { Module } from '@nestjs/common';
import { InMemoryAccountRepository } from './InMemoryAccountRepository';
import { InMemoryClientRepository } from './InMemoryClientRepository';
import { InMemoryTransactionRepository } from './inMemoryTransactionRepository';

@Module({
  providers: [
    {
      provide: ClientRepository,
      useClass: InMemoryClientRepository,
    },
    {
      provide: AccountRepository,
      useClass: InMemoryAccountRepository,
    },
    {
      provide: TransactionRepository,
      useClass: InMemoryTransactionRepository,
    },
  ],
  exports: [ClientRepository, AccountRepository, TransactionRepository],
})
export class MockedDatabaseModule {}
