import { Injectable } from '@angular/core';
import { FinanceTransaction } from '../models/FinanceTransition';
import { CreateIncomeSchema } from '../schemas/create-income.schema';
import { ApiService } from './api-service';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  constructor(private readonly apiService: ApiService) {}

  public getAll(workspaceId: string) {
    return this.apiService.get<FinanceTransaction[]>(
      `/transactions/${workspaceId}`
    );
  }

  public createIncome(data: CreateIncomeSchema) {
    const url = '/transactions/income';
    return this.apiService.post<FinanceTransaction>(url, data);
  }

  public createExpense() {}
}
