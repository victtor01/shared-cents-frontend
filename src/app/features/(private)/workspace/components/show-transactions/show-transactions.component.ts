import { Component, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FinanceTransaction } from '@app/core/models/FinanceTransition';
import { User } from '@app/core/models/User';
import { AuthService } from '@app/core/services/auth-service';
import { formatToBRL } from '@app/shared/utils/format-to-brl';

type TransactionType = 'INCOME' | 'EXPENSE';
@Component({
  selector: 'show-transactions',
  templateUrl: 'show-transactions.component.html',
  imports: [MatIconModule],
})
export class ShowTransactionsComponent implements OnInit {
  @Input()
  public transactions?: FinanceTransaction[];
  public isOpenInput = signal<boolean>(false);
  public type = signal<TransactionType>('INCOME');
  public form: FormGroup;
  public user?: User;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      amount: [null, [Validators.required]],
      payment_method: ['', [Validators.required]],
      workspaceId: ['', [Validators.required]],
      status: [''],
    });
  }

  public setType(type: TransactionType) {
    this.type.set(type);
  }

  public handleOpenInput() {
    this.isOpenInput.update((e) => !e);
  }

  public ngOnInit(): void {
    this.authService.currentUser$.subscribe((e) => {
      if (e) {
        this.user = e;
      }
    });
  }

  public formatBRL(v: string | number | null) {
    return formatToBRL(v);
  }
}
