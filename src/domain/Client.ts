import { Account } from './Account';
import { BaseEntity } from './BaseEntity';

export interface ClientProps {
  username: string;
  password: string;
}

export class Client extends BaseEntity<ClientProps> {
  private _account: Account;

  constructor(props: ClientProps, id?: string, account?: Account) {
    super(props, id);
    this._account = account ?? new Account();
  }

  public get id(): string {
    return this._id;
  }

  public get username(): string {
    return this.props.username;
  }

  public get password(): string {
    return this.props.password;
  }

  public get account(): Account {
    return this._account;
  }
}
