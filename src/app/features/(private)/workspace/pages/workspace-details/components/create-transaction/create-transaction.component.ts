import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { FinanceTransaction, PaymentMethod } from '@app/core/models/FinanceTransition';
import { CreateExpenseSchema } from '@app/core/schemas/create-expense.schema';
import { CreateIncomeSchema } from '@app/core/schemas/create-income.schema';
import { ToastService } from '@app/core/services/toast.service';
import { TransactionsService } from '@app/core/services/transactions.service';
import { MoneyInputDirective } from '@app/shared/directives/app-money-input.directive';
import { paymentMethods, paymentMethodsLegend } from '@app/shared/utils/payment-methods';

type TransactionType = 'INCOME' | 'EXPENSE';

@Component({
  selector: 'create-transaction',
  templateUrl: './create-transaction.component.html',
  imports: [MatIconModule, ReactiveFormsModule, MoneyInputDirective],
})
export class CreateTransactionComponent implements OnInit {
  private _form: FormGroup;
  private _workspaceId!: string;
  private _paymentMethod = paymentMethods;
  private _methodsLegends = paymentMethodsLegend;
  public isOpenInput = signal<boolean>(false);
  public type = signal<TransactionType>('INCOME');
  
  @Output()
  public transactionCreated = new EventEmitter<FinanceTransaction>();

  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly toast: ToastService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {
    this._form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      amount: [null, [Validators.required]],
      payment_method: ['', [Validators.required]],
      status: ['PENDING'],
    });
  }

  get paymentsMethods() {
    return this._paymentMethod;
  }

  get legends() {
    return this._methodsLegends;
  }

  get form() {
    return this._form;
  }

  public setType(type: TransactionType) {
    this.type.set(type);
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('workspaceId');

      if (id) {
        this._workspaceId = id;
      }
    });
  }

  public handleStatus() {
    this._form.patchValue({
      status: this?._form?.get('status')?.value === 'PENDING' ? 'PAID' : 'PENDING',
    });
  }

  public selectMethod(method: PaymentMethod) {
    this._form.patchValue({
      payment_method: method,
    });
  }

  public handleOpenInput() {
    this.isOpenInput.update((e) => !e);
  }

  private createIncome = () => {
    const props = {
      name: this._form.get('name')?.value,
      payment_method: this._form.get('payment_method')?.value,
      amount: this._form.get('amount')?.value,
      workspaceId: this._workspaceId,
      description: '',
    } satisfies CreateIncomeSchema;

    this.transactionsService.createIncome(props).subscribe({
      next: (e) => {
        this.toast.success('Criado com sucesso!');
        this.isOpenInput.update(() => false);
        this.transactionCreated.emit(e);
        this._form.reset();
      },
    });
  };

  private createExpense = () => {
    const props = {
      name: this._form.get('name')?.value,
      payment_method: this._form.get('payment_method')?.value,
      amount: -Math.abs(this._form.get('amount')?.value),
      workspaceId: this._workspaceId,
      status: this._form.get('status')?.value,
      description: '',
    } satisfies CreateExpenseSchema;

    this.transactionsService.createExpense(props).subscribe({
      next: (e) => {
        this.toast.success('Criado com sucesso!');
        this.transactionCreated.emit(e);
        this.isOpenInput.set(false);
        this._form.reset();
      },
      error: (e: unknown) => {
        if (e instanceof Error) {
          this.toast.error(`Erro: ${e.message}`);
        }
      },
    });
  };

  public createTransaction() {
    if (this._form.invalid) {
      console.log(this._form.errors);
      this._form.markAllAsTouched();
      return;
    }

    if (!this._workspaceId) {
      this.toast.error('Entre com um espaço antes!');
      return;
    }

    if (!this._form.get('payment_method')?.value) {
      this.toast.error('Selecione um método de pagamento!');
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
}
