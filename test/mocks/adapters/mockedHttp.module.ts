import { HashService } from '@app/adapters';
import { GetBalance } from '@app/useCases/Account';
import { CreateClient } from '@app/useCases/Client';
import {
  CashOut,
  FilterTransactions,
  GetTransactions,
} from '@app/useCases/Transaction';
import {
  AccountController,
  AuthController,
  ClientController,
  TransactionController,
} from '@infra/http/controllers';
import { Module } from '@nestjs/common';
import { MockedDatabaseModule } from '../repositories/mockedDatabase.module';
import { InMemoryHashService } from './InMemoryHashService';
import { MockedAuthModule } from './mockedAuth.module';

@Module({
  imports: [MockedDatabaseModule, MockedAuthModule],
  controllers: [
    ClientController,
    AccountController,
    TransactionController,
    AuthController,
  ],
  providers: [
    { provide: HashService, useClass: InMemoryHashService },
    CreateClient,
    GetBalance,
    GetTransactions,
    FilterTransactions,
    CashOut,
  ],
})
export class MockedHttpModule {}
