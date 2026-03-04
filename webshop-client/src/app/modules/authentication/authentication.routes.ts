import { Routes } from '@angular/router';
import { AccountView } from './view/account-view/account-view';
import { AccountDetails } from './components/account-details/account-details';
import { authGuard } from '@common/guards/auth/auth-guard';
import { authenticationRoutePaths } from 'src/app/app.routes';

export const routes: Routes = [
  {
    path: authenticationRoutePaths.base,
    component: AccountView,
    canActivate: [authGuard],
    children: [{ path: '', component: AccountDetails }],
  },
];
