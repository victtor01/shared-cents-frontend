import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FinanceTransaction } from '@app/core/models/FinanceTransition';
import { Workspace } from '@app/core/models/Workspace';
import { TransactionsService } from '@app/core/services/transactions-service';
import { WorkspaceService } from '@app/core/services/workspace-service';
import { HeaderWorkspaceComponent } from './components/header/header-workspace.component';
import { ShowTransactionsComponent } from './components/show-transactions/show-transactions.component';

@Component({
  imports: [HeaderWorkspaceComponent, ShowTransactionsComponent],
  templateUrl: './workspace-page.component.html',
})
export class DetailsWorkspaceComponent implements OnInit {
  private workspaceId?: string | null;
  public workspace?: Workspace;
  public transactions?: FinanceTransaction[];

  constructor(
    private readonly currRoute: ActivatedRoute,
    private readonly workspaceService: WorkspaceService,
    private readonly transactionsService: TransactionsService,
  ) {
    this.currRoute.paramMap.subscribe((params: ParamMap) => {
      this.workspaceId = params.get('workspaceId');
    });
  }

  public ngOnInit(): void {
    if (!this.workspaceId) return;

    this.workspaceService.findById(this.workspaceId).subscribe((e) => {
      this.workspace = e;
    });

    this.transactionsService.getAll(this.workspaceId).subscribe((e) => {
      this.transactions = e;
    });
  }
}
