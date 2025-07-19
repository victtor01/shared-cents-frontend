import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'date-transaction-modal-details',
  templateUrl: './date-transactions-modal-details.component.html',
  imports: [CommonModule, MatDialogModule],
})
export class DateTransactionsModalDetailsComponent {
  constructor(
    private readonly dialog: MatDialogRef<DateTransactionsModalDetailsComponent>
  ) {}
}
