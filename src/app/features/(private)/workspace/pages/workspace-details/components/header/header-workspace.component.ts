import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Workspace } from '@app/core/models/Workspace';
import { formatToBRL } from '@app/shared/utils/format-to-brl';
import { getIcon } from '@app/shared/utils/workspaces-icons';

@Component({
  selector: 'header-workspace',
  imports: [MatIconModule],
  templateUrl: './header-workspace.component.html',
})
export class HeaderWorkspaceComponent {
  @Input()
  public workspace?: Workspace;

  public icon(icon?: string) {
    return getIcon(icon);
  }

  public formatBRL(v?: string | number | null) {
    return formatToBRL(v ?? 0);
  }
}
