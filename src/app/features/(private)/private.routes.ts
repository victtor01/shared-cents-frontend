import { Routes } from '@angular/router';
import { PrivateLayoutComponent } from '@app/shared/layouts/private-layout/private-layout.component';
import { HomePageComponent } from './home/home-page.component';
import { DetailsWorkspaceComponent } from './workspace/workspace-page.component';

export const PRIVATE_ROUTES: Routes = [
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      { path: 'workspaces', component: HomePageComponent },
      { path: 'workspaces/:workspaceId', component: DetailsWorkspaceComponent },
    ],
  },
];
