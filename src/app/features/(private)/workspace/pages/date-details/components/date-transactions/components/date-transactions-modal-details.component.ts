import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FinanceTransaction } from '@app/core/models/FinanceTransition';
import { ToastService } from '@app/core/services/toast.service';
import { TransactionsService } from '@app/core/services/transactions.service';
import { ToPaymentMethodIconPipe } from '@app/shared/pipes/to-payment-method-icon.pipe';

@Component({
  selector: 'date-transaction-modal-details',
  templateUrl: './date-transactions-modal-details.component.html',
  imports: [CommonModule, MatIcon, ToPaymentMethodIconPipe],
})
export class DateTransactionsModalDetailsComponent implements OnInit {
  public transaction?: FinanceTransaction | null;

  constructor(
    private readonly dialog: DialogRef<DateTransactionsModalDetailsComponent>,
    private readonly transactionsService: TransactionsService,
    private readonly toastService: ToastService,

    @Inject(DIALOG_DATA)
    private readonly data: { id: string }
  ) {}

  public ngOnInit(): void {
    if (!this?.data?.id) {
      this.toastService.error('Id da transação não está presente!');
      return;
    }

    this.transactionsService.findById(this.data?.id).subscribe((e) => {
      if (e?.id) {
        this.transaction = e;
      } else {
        this.toastService.error('Essa transação não existe!');
      }
    });
  }

  public closeDialog(): void {
    this.dialog.close();
  }

  get id() {
    return this.data?.id;
  }
}
