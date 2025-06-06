import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workspace } from '../models/Workspace';
import { ApiService } from './api-service';

@Injectable({ providedIn: 'root' })
export class WorkspaceService {
  constructor(private readonly apiService: ApiService) {}

  public getAllWorkspaces(): Observable<Workspace[]> {
    const workspaces: Observable<Workspace[]> =
      this.apiService.get('/workspaces');
    return workspaces;
  }

  public findById(workspaceId: string) {
    const worksapce = this.apiService.get<Workspace>(
      `/workspaces/${workspaceId}`
    );
    return worksapce;
  }
}
