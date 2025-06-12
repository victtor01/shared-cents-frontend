import { Pipe, PipeTransform } from '@angular/core';
import { getPaymentMethodIcon } from '../utils/payment-methods-icons';

@Pipe({
  name: 'toPaymentMethodIcon',
})
export class ToPaymentMethodIconPipe implements PipeTransform {
  transform(value?: string, ...args: unknown[]): unknown {
    return getPaymentMethodIcon(value);
  }
}
