import { Routes } from '@angular/router';
import { PrivateLayoutComponent } from '@app/shared/layouts/private-layout/private-layout.component';

export const PRIVATE_ROUTES: Routes = [
  { path: '', redirectTo: 'workspaces', pathMatch: 'full' },
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      { path: '', redirectTo: 'workspaces', pathMatch: 'full' },
      {
        path: 'workspaces',
        loadChildren: () =>
          import('./workspace/workspaces.routes').then((m) => m.WORKSPACES_ROUTES),
      },
    ],
  },
];
