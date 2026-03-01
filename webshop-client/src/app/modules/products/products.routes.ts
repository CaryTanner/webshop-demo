import { Routes } from '@angular/router';
import { ProductDetailsView } from './view/product-details-view/product-details-view';
import { ProductsView } from './view/products-view/products-view';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductsView,
  },
  {
    path: 'products/:id',
    component: ProductDetailsView,
  },
];
