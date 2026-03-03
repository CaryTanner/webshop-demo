import { Routes } from '@angular/router';
import { ProductDetailsView } from './view/product-details-view/product-details-view';
import { ProductsView } from './view/products-view/products-view';
import { adminGuard } from '@common/guards/admin/admin-guard';
import { ProductForm } from './view/product-form/product-form';

export const routes: Routes = [
  {
    path: '',
    component: ProductsView,
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: ProductForm,
    canActivate: [adminGuard],
  },
  {
    path: 'edit/:id',
    component: ProductForm,
    canActivate: [adminGuard],
  },
  {
    path: ':id',
    component: ProductDetailsView,
  },
];
