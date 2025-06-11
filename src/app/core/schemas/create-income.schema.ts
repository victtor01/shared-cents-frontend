import { PaymentMethod } from '../models/FinanceTransition';

export interface CreateIncomeSchema {
  name: string;
  payment_method: PaymentMethod;
  amount: number;
  workspaceId: string;
  description?: string | null;
}
