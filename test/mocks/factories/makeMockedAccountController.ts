import { GetBalance } from '@app/useCases/Account';
import { AccountController } from '@infra/http/controllers';
import { InMemoryAccountRepository } from '../repositories';

export function makeMockedAccountController(): AccountController {
  const memoryRepo = new InMemoryAccountRepository();
  const getBalance = new GetBalance(memoryRepo);
  const accountController = new AccountController(getBalance);
  return accountController;
}
