import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { FinanceTransaction } from '@app/core/models/FinanceTransition';
import { ToastService } from '@app/core/services/toast.service';
import { TransactionsService } from '@app/core/services/transactions.service';
import { ToFormatBrlPipe } from '@app/shared/pipes/to-format-brl-pipe/to-format-brl.pipe';
import { ToPaymentMethodIconPipe } from '@app/shared/pipes/to-payment-method-icon.pipe';
import { DateTransactionsModalDetailsComponent } from './components/date-transactions-modal-details.component';

@Component({
  templateUrl: './date-transactions.component.html',
  selector: 'date-transactions',
  imports: [MatIconModule, ToFormatBrlPipe, CommonModule, ToPaymentMethodIconPipe],
})
export class DateTransactionsComponent implements OnInit {
  public transactions: FinanceTransaction[] = [];

  private dialogRef: any;

  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly toastService: ToastService,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}

  public details(id: string): void {
    if (this.dialogRef && this.dialogRef.getState() === 0) {
      return;
    }

    this.dialogRef = this.dialog.open(DateTransactionsModalDetailsComponent, {
      width: "100rem",
      panelClass: 'custom-dialog',
      data: { id: id },
    });

    this.dialogRef.afterClosed().subscribe((result: any) => {
      console.log('O modal foi fechado com:', result);

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { edit: null },
        queryParamsHandling: 'merge', // Mantém outros query params se houver
      });
    });
  }

  public ngOnInit(): void {
    const workspaceId = this.route.snapshot.paramMap.get('workspaceId');
    const date = this.route.snapshot.paramMap.get('date');

    if (!workspaceId || !date) {
      return this.toastService.error('A data ou espaço faltando!');
    }

    this.transactionsService.findByDate(workspaceId, date).subscribe((e) => {
      console.log(e);
      this.transactions = e;
    });
  }
}
