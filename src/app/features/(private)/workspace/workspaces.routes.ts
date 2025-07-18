import { Routes } from '@angular/router';
import { DateDetailsComponent } from './pages/date-details/pages/date-details.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { DetailsWorkspaceComponent } from './pages/workspace-details/workspace-page.component';

export const WORKSPACES_ROUTES: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full', // Importante para garantir que só corresponda ao caminho exato
  },
  {
    path: ':workspaceId',
    component: DetailsWorkspaceComponent,
  },
  {
    path: ':workspaceId/:date',
    component: DateDetailsComponent,
  },
];
