import { HashService, TokenService } from '@app/adapters';
import { GetBalance } from '@app/useCases/Account';
import { CreateClient, LoginClient } from '@app/useCases/Client';
import {
  CashOut,
  FilterTransactions,
  GetTransactions,
} from '@app/useCases/Transaction';
import { BcryptHashService, JWTTokenService } from '@infra/adapters';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import {
  AccountController,
  ClientController,
  TransactionController,
} from './controllers';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController, AccountController, TransactionController],
  providers: [
    { provide: HashService, useClass: BcryptHashService },
    { provide: TokenService, useClass: JWTTokenService },
    CreateClient,
    LoginClient,
    GetBalance,
    GetTransactions,
    FilterTransactions,
    CashOut,
  ],
})
export class HttpModule {}
