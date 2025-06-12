import { PaymentMethod } from '@app/core/models/FinanceTransition';

export const paymentMethodIcons: Record<PaymentMethod, string> = {
  PIX: 'qr_code',
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'payment',
  BANK_TRANSFER: 'account_balance',
  CASH: 'money',
};

type IconKey = keyof typeof paymentMethodIcons;

export function getPaymentMethodIcon(icon?: string | null): string {
  if (icon && icon in paymentMethodIcons) {
    return paymentMethodIcons[icon as IconKey];
  }

  return paymentMethodIcons['PIX'];
}
