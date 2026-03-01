import { Routes } from '@angular/router';
import { AccountView } from './view/account-view/account-view';
import { AccountDetails } from './components/account-details/account-details';

export const routes: Routes = [
  {
    path: 'account',
    component: AccountView,
    children: [{ path: '', component: AccountDetails }],
  },
];
