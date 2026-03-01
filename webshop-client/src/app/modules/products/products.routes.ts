import { Routes } from '@angular/router';
import { ProductDetailsView } from './view/product-details-view/product-details-view';
import { ProductsView } from './view/products-view/products-view';
import { adminGuard } from '@common/guards/admin/admin-guard';
import { ProductForm } from './view/product-form/product-form';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductsView,
  },
  {
    path: 'products/:id',
    component: ProductDetailsView,
  },
  {
    path: 'products/manage/:id',
    component: ProductForm,
    canActivate: [adminGuard],
  },
];
