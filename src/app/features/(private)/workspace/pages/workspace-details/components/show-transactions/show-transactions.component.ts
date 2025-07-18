import { CommonModule } from '@angular/common';
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
import { ActivatedRoute, Router } from '@angular/router';
import { FinanceTransaction } from '@app/core/models/FinanceTransition';
import { User } from '@app/core/models/User';
import { AuthService } from '@app/core/services/auth.service';
// import { ToPaymentMethodIconPipe } from '@app/shared/pipes/to-payment-method-icon.pipe';
import { formatToBRL } from '@app/shared/utils/format-to-brl';

@Component({
  selector: 'show-transactions',
  templateUrl: 'show-transactions.component.html',
  imports: [MatIconModule, ReactiveFormsModule, CommonModule],
})
export class ShowTransactionsComponent implements OnInit, AfterViewInit {
  @Input()
  public transactions?: { date: string; transactions: FinanceTransaction[] }[];

  private _user?: User;

  @ViewChildren('transactionItem')
  private transactionItems!: QueryList<ElementRef>;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  public ngAfterViewInit(): void {
    this.transactionItems.changes.subscribe(() => {
      this.scrollToBottom();
    });
  }

  public getPositiveCount(dailyTransactions: FinanceTransaction[]): number {
    if (!dailyTransactions) return 0;
    return dailyTransactions.filter((t) => t.amount > 0).length;
  }

  public getNegativeCount(dailyTransactions: FinanceTransaction[]): number {
    if (!dailyTransactions) return 0;
    return dailyTransactions.filter((t) => t.amount < 0).length;
  }

  public redirectToDetails(date: string) {
    this.router.navigate([date], { relativeTo: this.route });
  }

  public getPositivePercetage(dailyTransactions: FinanceTransaction[]): number {
    if (!dailyTransactions || dailyTransactions?.length === 0) {
      return 0;
    }

    const positiveCount = this.getPositiveCount(dailyTransactions);
    const negativeCount = this.getNegativeCount(dailyTransactions);
    const total = positiveCount + negativeCount;

    if (total === 0) {
      return 0;
    }

    return (positiveCount / total) * 100;
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

  public isToday(dateString: string): boolean {
    if (!dateString) {
      return false;
    }

    const today = new Date();
    const inputDate = new Date(dateString + 'T00:00:00');

    return (
      inputDate.getFullYear() === today.getFullYear() &&
      inputDate.getMonth() === today.getMonth() &&
      inputDate.getDate() === today.getDate()
    );
  }

  public getDayClass(transactionCount: number | undefined): string {
    const count = transactionCount ?? 0; // Garante que temos um número
  
    if (count > 5) {
      return 'bg-gradient-to-b from-indigo-300 to-white dark:from-violet-600 dark:to-zinc-900'; //  Esmeralda para muitos
    }

    if (count >= 3) {
      return 'bg-gradient-to-b from-violet-200 to-white dark:from-violet-900 dark:to-zinc-900'; // Violeta para alguns
    }

    if (count >= 1) {
      return 'bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950 dark:to-zinc-900'; // Índigo para poucos
    }

    return 'bg-white dark:bg-zinc-900';
  }

  public formatBRL(v: string | number | null) {
    return formatToBRL(v);
  }
}
