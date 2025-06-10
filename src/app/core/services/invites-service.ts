import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invite } from '../models/Invite';
import { ApiService } from './api-service';

@Injectable({ providedIn: 'root' })
export class InvitesService {
  constructor(private readonly apiService: ApiService) {}

  public getAll(): Observable<Invite[]> {
    const workspaces: Observable<Invite[]> = this.apiService.get(
      '/workspaces-invites'
    );
    return workspaces;
  }
}
