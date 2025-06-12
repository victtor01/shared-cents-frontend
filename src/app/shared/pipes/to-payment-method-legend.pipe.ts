import { Pipe, PipeTransform } from '@angular/core';
import { PaymentMethod } from '@app/core/models/FinanceTransition';
import { paymentMethods, paymentMethodsLegend } from '../utils/payment-methods';

@Pipe({
  name: 'toPaymentMethodLegend',
})
export class ToPaymentMethodLegendPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (paymentMethods.includes(value as any)) {
      return paymentMethodsLegend[value as PaymentMethod];
    }

    return null;
  }
}
