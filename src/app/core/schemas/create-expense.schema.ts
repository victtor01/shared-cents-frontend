import { ExpenseStatus, PaymentMethod } from '../models/FinanceTransition';

export interface CreateExpenseSchema {
  name: string;
  payment_method: PaymentMethod;
  status: ExpenseStatus;
  amount: number;
  workspaceId: string;
  description?: string | null;
}
