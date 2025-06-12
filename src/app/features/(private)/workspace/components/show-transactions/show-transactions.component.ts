import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FinanceTransaction } from '@app/core/models/FinanceTransition';
import { User } from '@app/core/models/User';
import { AuthService } from '@app/core/services/auth.service';
import { ToPaymentMethodIconPipe } from '@app/shared/pipes/to-payment-method-icon.pipe';
import { formatToBRL } from '@app/shared/utils/format-to-brl';

@Component({
  selector: 'show-transactions',
  templateUrl: 'show-transactions.component.html',
  imports: [MatIconModule, ReactiveFormsModule, ToPaymentMethodIconPipe],
})
export class ShowTransactionsComponent implements OnInit, AfterViewInit {
  @Input()
  public transactions?: FinanceTransaction[];
  private _user?: User;

  @ViewChildren('transactionItem')
  private transactionItems!: QueryList<ElementRef>;

  constructor(private readonly authService: AuthService) {}

  public ngAfterViewInit(): void {
    this.transactionItems.changes.subscribe(() => {
      this.scrollToBottom();
    });
  }

  get user() {
    return this._user;
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      try {
        if (this.transactionItems && this.transactionItems.last) {
          this.transactionItems.last.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        }
      } catch (err) {
        console.error('Erro ao rolar a view:', err);
      }
    }, 100);
  }

  public ngOnInit(): void {
    this.authService.currentUser$.subscribe((e) => {
      if (e) {
        this._user = e;
      }
    });
  }

  public formatBRL(v: string | number | null) {
    return formatToBRL(v);
  }
}
