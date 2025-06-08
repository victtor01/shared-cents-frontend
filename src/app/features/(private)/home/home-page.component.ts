import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { User } from '@app/core/models/User';
import { Workspace } from '@app/core/models/Workspace';
import { AuthService } from '@app/core/services/auth-service';
import { WorkspaceService } from '@app/core/services/workspace-service';
import { getIcon, ICONS } from '@app/shared/utils/icons';
import { InvitesComponent } from './components/invites/invites.component';
import { SelectingDialogComponent } from './components/selecting-dialog/selecting-dialog.component';
import { UserOptionsComponent } from './components/user-options/user-options.component';

@Component({
  templateUrl: './home-page.component.html',
  selector: 'home-page',
  imports: [MatIconModule, UserOptionsComponent],
})
export class HomePageComponent implements OnInit {
  public workspaces?: Workspace[];
  public user?: User | null;
  public icons = ICONS;

  constructor(
    private readonly workspaceService: WorkspaceService,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}

  public selectWorkspace(workspaceId: string): void {
    const dialogRef = this.dialog.open(SelectingDialogComponent, {
      disableClose: true,
      backdropClass: 'backdrop-blur-sm',
    });

    setTimeout(() => {
      dialogRef.close(); // Fecha o modal
      this.router.navigate(['/workspaces', workspaceId]); // Navega para a nova rota
    }, 1500); // 1.5 segundos de delay
  }

  public openInvites() {
    this.dialog.open(InvitesComponent);
  }

  public ngOnInit(): void {
    this.workspaceService.getAllWorkspaces().subscribe((e) => {
      this.workspaces = e;
    });

    this.authService.currentUser$.subscribe((e) => {
      this.user = e;
    });
  }

  public handleIcon(icon?: string | null) {
    return getIcon(icon);
  }
}
