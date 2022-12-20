import { NotFoundError } from '@app/errors';
import { AccountRepository } from '@app/repositories';

interface GetBalanceRequest {
  accountId: string;
}

interface GetBalanceResponse {
  balance: number;
}

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
