import {
  Component,
  ElementRef,
  HostListener,
  Input,
  signal,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { User } from '@app/core/models/User';
import { InvitesComponent } from '../invites/invites.component';

@Component({
  selector: 'user-options',
  templateUrl: './user-options.component.html',
  imports: [MatIconModule],
})
export class UserOptionsComponent {
  constructor(private elementRef: ElementRef, private dialog: MatDialog) {}

  @Input()
  public user?: User;

  public isOpen = signal<boolean>(false);

  public handleIsOpen() {
    this.isOpen.update((e) => !e);
  }

  public openInvites() {
    this.dialog.open(InvitesComponent, {
      backdropClass: 'bg-white',
      width: '100%',
      maxWidth: '40rem',
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      this.isOpen() &&
      !this.elementRef.nativeElement.contains(event.target as Node)
    ) {
      this.isOpen.set(false);
    }
  }
}
