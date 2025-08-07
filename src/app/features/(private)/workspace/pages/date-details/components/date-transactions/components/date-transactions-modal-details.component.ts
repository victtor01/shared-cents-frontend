import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FinanceTransaction } from '@app/core/models/FinanceTransition';
import { ToastService } from '@app/core/services/toast.service';
import { TransactionsService } from '@app/core/services/transactions.service';
import { modalAnimation } from '@app/shared/animations/modal-animation';
import { ToFormatBrlPipe } from '@app/shared/pipes/to-format-brl-pipe/to-format-brl.pipe';
import { ToPaymentMethodIconPipe } from '@app/shared/pipes/to-payment-method-icon.pipe';

@Component({
  selector: 'date-transaction-modal-details',
  templateUrl: './date-transactions-modal-details.component.html',
  styles: ``,
  imports: [
    CommonModule,
    ToPaymentMethodIconPipe,
    MatIconModule,
    ToFormatBrlPipe,
    ReactiveFormsModule,
  ],
  animations: [
    modalAnimation,
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: '*' })),
      ]),
    ]),
  ],
})
export class DateTransactionsModalDetailsComponent implements OnInit {
  @HostBinding('@modalAnimation') animation = true;
  public transaction?: FinanceTransaction | null;
  public form?: FormGroup;

  constructor(
    private readonly dialog: MatDialogRef<DateTransactionsModalDetailsComponent>,
    private readonly transactionsService: TransactionsService,
    private readonly toastService: ToastService,
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
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
        this.form = this.fb.group({
          description: [e.description || ''],
          name: [e.name, [Validators.required, Validators.minLength(3)]],
          amount: [e.amount, [Validators.required]],
          payment_method: [e.paymentMethod, [Validators.required]],
          status: [e.status],
        });
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
