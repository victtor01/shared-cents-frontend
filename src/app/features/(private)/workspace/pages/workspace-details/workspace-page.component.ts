import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FinanceTransaction } from '@app/core/models/FinanceTransition';
import { Workspace } from '@app/core/models/Workspace';
import { TransactionsService } from '@app/core/services/transactions.service';
import { WorkspaceService } from '@app/core/services/workspace.service';
import dayjs from 'dayjs';
import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';
import { HeaderWorkspaceComponent } from './components/header/header-workspace.component';
import { IncomeExpensesComponent } from './components/incomes-expenses/incomes-expenses.component';
import { MainInstallmentComponent } from './components/main-installment/main-installment.component';
import { ShowTransactionsComponent } from './components/show-transactions/show-transactions.component';

import 'dayjs/locale/pt-br';

@Component({
  imports: [
    HeaderWorkspaceComponent,
    ShowTransactionsComponent,
    CreateTransactionComponent,
    MainInstallmentComponent,
    IncomeExpensesComponent,
  ],
  templateUrl: './workspace-page.component.html',
})
export class DetailsWorkspaceComponent implements OnInit {
  private workspaceId?: string | null;
  public workspace?: Workspace;
  public transactions?: { date: string; transactions: FinanceTransaction[] }[];

  constructor(
    private readonly currRoute: ActivatedRoute,
    private readonly workspaceService: WorkspaceService,
    private readonly transactionsService: TransactionsService
  ) {
    this.currRoute.paramMap.subscribe((params: ParamMap) => {
      this.workspaceId = params.get('workspaceId');
    });
  }

  public updateTransactions(transaction: FinanceTransaction) {
    if (transaction?.id) {
      const today = dayjs().format('YYYY-MM-DD');
      const dailyTransaction = this.transactions?.find((obj) => obj.date === today);

      if (dailyTransaction) {
        dailyTransaction.transactions.push(transaction);
      } else {
        this.transactions?.push({
          date: today,
          transactions: [transaction],
        });
      }

      if (
        transaction?.amount < 0 &&
        Math.abs(transaction.amount) < this.workspace?.amount!
      ) {
        this.workspace!.amount += transaction?.amount;
      }
    }
  }

  public ngOnInit(): void {
    if (!this.workspaceId) return;

    this.workspaceService.findById(this.workspaceId).subscribe((e) => {
      this.workspace = e;
    });

    this.transactionsService.getAll(this.workspaceId).subscribe((e) => {
      console.log(e);
      this.transactions = e;
    });
  }
}
