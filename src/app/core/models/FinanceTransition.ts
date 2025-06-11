import { User } from './User';

export interface FinanceTransaction {
  id: string;
  name: string;
  description?: string | null;
  workspace?: string | null;
  paymentMethod?: PaymentMethod;
  createdAt?: string;
  updatedAt?: string;
  user?: User | null;
  amount: number;

  status?: ExpenseStatus | null;
}

export type PaymentMethod =
  | 'PIX'
  | 'CREDIT_CARD'
  | 'DEBIT_CARD'
  | 'BANK_TRANSFER'
  | 'CASH';

type ExpenseStatus = 'PAID' | 'PENDING';
