import { Routes } from '@angular/router';
import { ProductDetailsView } from './view/product-details-view/product-details-view';
import { ProductsView } from './view/products-view/products-view';
import { adminGuard } from '@common/guards/admin/admin-guard';
import { ProductForm } from './view/product-form/product-form';
import { productsRoutePaths } from 'src/app/app.routes';

export const routes: Routes = [
  {
    path: productsRoutePaths.base,
    component: ProductsView,
  },
  {
    path: productsRoutePaths.create,
    component: ProductForm,
    canActivate: [adminGuard],
  },
  {
    path: `${productsRoutePaths.editBase}:id`,
    component: ProductForm,
    canActivate: [adminGuard],
  },
  {
    path: `${productsRoutePaths.detailsBase}:id`,
    component: ProductDetailsView,
  },
];
