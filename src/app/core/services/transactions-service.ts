import { Injectable } from '@angular/core';
import { FinanceTransaction } from '../models/FinanceTransition';
import { ApiService } from './api-service';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  constructor(private readonly apiService: ApiService) {}

  public getAll(workspaceId: string) {
    return this.apiService.get<FinanceTransaction[]>(
      `/transactions/${workspaceId}`
    );
  }
}
