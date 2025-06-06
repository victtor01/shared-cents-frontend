import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'header-workspace',
  imports: [MatIconModule],
  templateUrl: './header-workspace.component.html',
})
export class HeaderWorkspaceComponent {
  @Input()
  public name?: string = '';
}
