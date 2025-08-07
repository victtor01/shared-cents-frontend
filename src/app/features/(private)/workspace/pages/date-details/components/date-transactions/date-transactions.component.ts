import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
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

  private dialogRef?: MatDialogRef<unknown, DateTransactionsModalDetailsComponent> | null;

  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly toastService: ToastService,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog
  ) {} 

  public details(id: string): void {
    if (this.dialogRef) {
      return;
    }

    this.dialogRef = this.dialog.open(DateTransactionsModalDetailsComponent, {
      width: 'min(40rem, 90%)',
      backdropClass: ['bg-transparent', 'dark:bg-zinc-950/40', 'backdrop-blur-lg'],
      data: { id: id },
      panelClass: "dialog-no-container",
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms',
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.dialogRef = null;
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
