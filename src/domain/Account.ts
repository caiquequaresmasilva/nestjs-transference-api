import { BaseEntity } from './BaseEntity';
import { InvalidTransactionError } from './errors';

export interface AccountProps {
  balance: number;
}

export class Account extends BaseEntity<AccountProps> {
  constructor(props?: AccountProps, id?: string) {
    super(props ?? { balance: 100 }, id);
  }
  public get balance(): number {
    return this.props.balance;
  }

  public debitAmount(amount: number) {
    if (amount > this.props.balance) {
      throw new InvalidTransactionError('Insufficient balance');
    }
    this.props.balance -= amount;
  }

  public creditAmount(amount: number) {
    this.props.balance += amount;
  }
}
