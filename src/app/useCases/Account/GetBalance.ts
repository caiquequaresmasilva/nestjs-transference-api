import { NotFoundError } from '@app/errors';
import { AccountRepository } from '@app/repositories';
import { Injectable } from '@nestjs/common';

interface GetBalanceRequest {
  accountId: string;
}

interface GetBalanceResponse {
  balance: number;
}
@Injectable()
export class GetBalance {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({ accountId }: GetBalanceRequest): Promise<GetBalanceResponse> {
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new NotFoundError('Account not found');
    }

    return {
      balance: account.balance,
    };
  }
}
