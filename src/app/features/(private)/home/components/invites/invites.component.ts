import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  templateUrl: './invites.component.html',
  imports: [MatIconModule],
})
export class InvitesComponent {
  constructor(public dialogRef: MatDialogRef<InvitesComponent>) {}

  public closeModal() {
    this.dialogRef.close();
  }
}
