import { HashService } from '@app/adapters';
import { GetBalance } from '@app/useCases/Account';
import { CreateClient } from '@app/useCases/Client';
import {
  CashOut,
  FilterTransactions,
  GetTransactions,
} from '@app/useCases/Transaction';
import { BcryptHashService } from '@infra/adapters';
import { AuthModule } from '@infra/auth/auth.module';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import {
  AccountController,
  AuthController,
  ClientController,
  TransactionController,
} from './controllers';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [
    ClientController,
    AccountController,
    TransactionController,
    AuthController,
  ],
  providers: [
    { provide: HashService, useClass: BcryptHashService },
    CreateClient,
    GetBalance,
    GetTransactions,
    FilterTransactions,
    CashOut,
  ],
})
export class HttpModule {}
