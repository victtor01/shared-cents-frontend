import { PaymentMethod } from '@app/core/models/FinanceTransition';

export const paymentMethods = [
  'PIX',
  'CREDIT_CARD',
  'DEBIT_CARD',
  'BANK_TRANSFER',
  'CASH',
] as const satisfies PaymentMethod[];

export const paymentMethodsLegend = {
  PIX: 'PIX',
  CREDIT_CARD: 'Cartão de crédito',
  DEBIT_CARD: 'Cartão de débito',
  BANK_TRANSFER: 'Transferencia',
  CASH: 'Dinheiro',
} satisfies Record<PaymentMethod, string>;
