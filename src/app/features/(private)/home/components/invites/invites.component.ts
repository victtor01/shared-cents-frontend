import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Invite } from '@app/core/models/Invite';
import { InvitesService } from '@app/core/services/invites.service';

@Component({
  templateUrl: './invites.component.html',
  imports: [MatIconModule],
})
export class InvitesComponent implements OnInit {
  constructor(
    private readonly dialogRef: MatDialogRef<InvitesComponent>,
    private readonly invitesService: InvitesService
  ) {}

  public invites: Invite[] = [];

  private loadInvites(): void {
    this.invitesService.getAll().subscribe((e) => {
      this.invites = e;
    });
  }

  public ngOnInit(): void {
    this.loadInvites();
  }

  public closeModal(): void {
    this.dialogRef.close();
  }
}
