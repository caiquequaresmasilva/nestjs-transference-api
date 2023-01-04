import { Account } from '@domain/Account';
import { Client } from '@domain/Client';
import { Transaction } from '@domain/Transaction';

export class InMemoryData {
  static clients: Client[] = [];
  static accounts: Account[] = [];
  static transactions: Transaction[] = [];

  static clear() {
    this.clients = [];
    this.accounts = [];
    this.transactions = [];
  }
}
