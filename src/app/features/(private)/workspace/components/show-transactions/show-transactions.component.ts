import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import {
  FinanceTransaction,
  PaymentMethod,
} from '@app/core/models/FinanceTransition';
import { User } from '@app/core/models/User';
import { CreateIncomeSchema } from '@app/core/schemas/create-income.schema';
import { AuthService } from '@app/core/services/auth-service';
import { TransactionsService } from '@app/core/services/transactions-service';
import { formatToBRL } from '@app/shared/utils/format-to-brl';
import {
  paymentMethods,
  paymentMethodsLegend,
} from '@app/shared/utils/paymentMethods';

type TransactionType = 'INCOME' | 'EXPENSE';
@Component({
  selector: 'show-transactions',
  templateUrl: 'show-transactions.component.html',
  imports: [MatIconModule, ReactiveFormsModule],
})
export class ShowTransactionsComponent implements OnInit, AfterViewInit {
  @Input()
  public transactions?: FinanceTransaction[];

  @Output()
  public transactionCreated = new EventEmitter<FinanceTransaction>();

  public isOpenInput = signal<boolean>(false);
  public type = signal<TransactionType>('INCOME');
  public form: FormGroup;

  private _user?: User;
  private paymentMethods = paymentMethods;
  private legends_paymentsMethods = paymentMethodsLegend;
  private workspaceId?: string;

  @ViewChildren('transactionItem')
  private transactionItems!: QueryList<ElementRef>;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly transactionsService: TransactionsService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      amount: [null, [Validators.required]],
      payment_method: ['', [Validators.required]],
      status: [''],
    });
  }

  public ngAfterViewInit(): void {
    this.transactionItems.changes.subscribe(() => {
      this.scrollToBottom();
    });
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

  private createIncome = () => {
    const props = {
      name: this.form.get('name')?.value,
      payment_method: this.form.get('payment_method')?.value,
      amount: this.form.get('amount')?.value,
      workspaceId: this.workspaceId!,
      description: '',
    } satisfies CreateIncomeSchema;

    this.transactionsService.createIncome(props).subscribe((e) => {
      this.transactionCreated.emit(e);
      this.isOpenInput.set(false);
      this.form.reset();
    });
  };

  private createExpense = () => {};

  public setType(type: TransactionType) {
    this.type.set(type);
  }

  public createTransaction() {
    if (this.form.invalid) {
      console.log(this.form.errors);
      this.form.markAllAsTouched();
      return;
    }

    if (!this.workspaceId) {
      alert('SEM ESPAÇO');
      return;
    }

    switch (this.type()) {
      case 'INCOME':
        this.createIncome();
        break;
      case 'EXPENSE':
        this.createExpense();
        break;
    }
  }

  public selectMethod(method: PaymentMethod) {
    this.form.patchValue({
      payment_method: method,
    });
  }

  public handleOpenInput() {
    this.isOpenInput.update((e) => !e);
  }

  public ngOnInit(): void {
    this.authService.currentUser$.subscribe((e) => {
      if (e) {
        this._user = e;
      }
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('workspaceId');

      if (id) {
        this.workspaceId = id;
      }
    });
  }

  public formatBRL(v: string | number | null) {
    return formatToBRL(v);
  }

  get paymentsMethods() {
    return this.paymentMethods;
  }

  get user() {
    return this._user;
  }

  get legends() {
    return this.legends_paymentsMethods;
  }
}
