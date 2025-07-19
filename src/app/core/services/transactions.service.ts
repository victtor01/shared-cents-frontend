import { Injectable } from '@angular/core';
import { FinanceTransaction } from '../models/FinanceTransition';
import { CreateExpenseSchema } from '../schemas/create-expense.schema';
import { CreateIncomeSchema } from '../schemas/create-income.schema';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  constructor(private readonly apiService: ApiService) {}

  public getAll(workspaceId: string) {
    return this.apiService.get<{ date: string; transactions: FinanceTransaction[] }[]>(
      `/transactions/workspace/${workspaceId}`
    );
  }

  

  public findByDate(workspaceId: string, date: string) {
    return this.apiService.get<FinanceTransaction[]>(
      `/transactions/workspace/${workspaceId}/${date}`
    );
  }

  public createIncome(data: CreateIncomeSchema) {
    const url = '/transactions/income';
    return this.apiService.post<FinanceTransaction>(url, data);
  }

  public createExpense(data: CreateExpenseSchema) {
    const url = '/transactions/expense';
    return this.apiService.post<FinanceTransaction>(url, data);
  }
}
