import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { FinanceTransaction } from '@app/core/models/FinanceTransition';
import { ToastService } from '@app/core/services/toast.service';
import { TransactionsService } from '@app/core/services/transactions.service';
import { ToFormatBrlPipe } from '@app/shared/pipes/to-format-brl-pipe/to-format-brl.pipe';
import { ToPaymentMethodIconPipe } from '@app/shared/pipes/to-payment-method-icon.pipe';

@Component({
  templateUrl: './date-transactions.component.html',
  selector: 'date-transactions',
		imports: [MatIconModule, ToFormatBrlPipe, CommonModule, ToPaymentMethodIconPipe],
})
export class DateTransactionsComponent implements OnInit {
  public transactions: FinanceTransaction[] = [];

  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly toastService: ToastService,
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const workspaceId = this.route.snapshot.paramMap.get('workspaceId');
    const date = this.route.snapshot.paramMap.get('date');

    if (!workspaceId || !date) {
      return this.toastService.error('A data ou espaço faltando!');
    }

    this.transactionsService.findByDate(workspaceId, date).subscribe((e) => {
					console.log(e)
      this.transactions = e;
    });
  }
}
