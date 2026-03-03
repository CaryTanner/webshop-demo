import { Routes } from '@angular/router';
import { AccountView } from './view/account-view/account-view';
import { AccountDetails } from './components/account-details/account-details';
import { authGuard } from '@common/guards/auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: AccountView,
    pathMatch: 'full',
    canActivate: [authGuard],
    children: [{ path: '', component: AccountDetails }],
  },
];
