import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FinanceTransaction } from '@app/core/models/FinanceTransition';
import { User } from '@app/core/models/User';
import { AuthService } from '@app/core/services/auth-service';

@Component({
  selector: 'show-transactions',
  templateUrl: 'show-transactions.component.html',
  imports: [MatIconModule],
})
export class ShowTransactionsComponent implements OnInit {
  @Input()
  public transactions?: FinanceTransaction[];
  public user?: User | null;

  constructor(private readonly authService: AuthService) {}

  public ngOnInit(): void {
    this.authService.currentUser$.subscribe((e) => {
      this.user = e;
    });
  }
}
