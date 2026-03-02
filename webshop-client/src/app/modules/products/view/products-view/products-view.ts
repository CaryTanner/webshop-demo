import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '@module/authentication/service/authentication-service';
import { ProductsFilters } from '@module/products/components/products-filters/products-filters';
import { ProductsList } from '@module/products/components/products-list/products-list';
import { GetProductsParams } from '@module/products/product.interface';
import { ProductsService } from '@module/products/service/products-service';
import { BehaviorSubject, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-products-view',
  imports: [RouterModule, MatButtonModule, ProductsFilters, ProductsList, AsyncPipe],
  templateUrl: './products-view.html',
  styleUrl: './products-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsView {
  private authService = inject(AuthenticationService);
  public $isAdmin = this.authService.isAdmin();
  public productsService = inject(ProductsService);
  public queryProducts$ = new BehaviorSubject<GetProductsParams>({} as GetProductsParams);
  public products$ = this.getProducts();

  getProducts() {
    return this.queryProducts$.pipe(
      switchMap((query) => {
        return this.productsService.getProducts(query).pipe(startWith(null)); // startWith null to show loading state in the UI
      }),
    );
  }
}
