import { FinanceTransaction } from './FinanceTransition';
import { User } from './User';

export interface Workspace {
  id: string;
  name: string;
  icon: string;
  financeEntry: FinanceTransaction[];
  members: User[];
  user: User;
  amount: number;
}
