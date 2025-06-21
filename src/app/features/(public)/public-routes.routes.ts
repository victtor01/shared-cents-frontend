import { Routes } from '@angular/router';
import { EnterPageComponent } from './default/enter-default-page.component';
import { AuthLayoutComponent } from './login/components/layout/auth-layout.component';
import { LoginComponent } from './login/components/login/login.component';


export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    component: EnterPageComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
