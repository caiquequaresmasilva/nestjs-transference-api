import { Replace } from '@helpers/Replace';
import { Account } from './Account';
import { BaseEntity } from './BaseEntity';
import { InvalidTransactionError } from './errors';

export interface TransactionProps {
  amount: number;
  creditedAccount: Account;
  debitedAccount: Account;
  createdAt: Date;
}

export class Transaction extends BaseEntity<TransactionProps> {
  constructor(
    props: Replace<TransactionProps, { createdAt?: Date }>,
    id?: string,
  ) {
    super(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }

  public executeTransference() {
    const { creditedAccount, debitedAccount, amount } = this.props;
    if (creditedAccount.id == debitedAccount.id) {
      throw new InvalidTransactionError();
    }

    debitedAccount.debitAmount(amount);
    creditedAccount.creditAmount(amount);
  }

  public get amount(): number {
    return this.props.amount;
  }

  public get creditedAccount(): Account {
    return this.props.creditedAccount;
  }

  public get debitedAccount(): Account {
    return this.props.debitedAccount;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
