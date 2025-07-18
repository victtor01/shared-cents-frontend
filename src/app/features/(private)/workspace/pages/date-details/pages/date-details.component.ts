import { Component } from '@angular/core';
import { DateTransactionsComponent } from '../components/date-transactions/date-transactions.component';
import { HeaderDateDetais } from '../components/header-date-details/header-date-details.component';

@Component({ templateUrl: 'date-details.component.html', imports: [HeaderDateDetais, DateTransactionsComponent] })
export class DateDetailsComponent {}
