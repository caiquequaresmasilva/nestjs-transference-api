import { NotFoundError } from '@app/errors';
import { ClientRepository, TransactionRepository } from '@app/repositories';
import { Transaction } from '@domain/Transaction';

interface CashOutRequest {
  fromClientUSername: string;
  toClientUsername: string;
  amount: number;
}

interface CashOutResponse {
  transaction: Transaction;
}

export class CashOut {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute({
    fromClientUSername,
    toClientUsername,
    amount,
  }: CashOutRequest): Promise<CashOutResponse> {
    const [fromClient, toClient] = await Promise.all([
      this.clientRepository.findByUsername(fromClientUSername),
      this.clientRepository.findByUsername(toClientUsername),
    ]);

    if (!fromClient) {
      throw new NotFoundError('Client for cash-out not found');
    }
    if (!toClient) {
      throw new NotFoundError('Client for cash-in not found');
    }

    const transaction = new Transaction({
      amount,
      debitedAccount: fromClient.account,
      creditedAccount: toClient.account,
    });

    await this.transactionRepository.create(transaction);
    return { transaction };
  }
}
