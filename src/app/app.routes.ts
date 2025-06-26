import { Routes } from '@angular/router';
import { LoginComponent } from './common/authentication/login/login.component';
import { SignUpComponent } from './common/authentication/sign-up/sign-up.component';
import { DashboardComponent } from './common/tracker/dashboard/dashboard/dashboard.component';
import { authenticationGuard } from './guards/authentication.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [authenticationGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'signup',
        component: SignUpComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
