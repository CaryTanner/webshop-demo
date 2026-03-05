import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NotificationService } from '@common/services/notification/notification.service';
import { AuthenticationService } from '@module/authentication/service/authentication-service';
import { CartItem } from '@module/orders/order.interface';
import { OrderService } from '@module/orders/service/order-service';
import { Product } from '@module/products/product.interface';
import { ProductsService } from '@module/products/service/products-service';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { ROUTE_PATHS } from 'src/app/app.routes';

@Component({
  selector: 'app-product-details-view',
  imports: [MatChipsModule, CurrencyPipe, MatDivider, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './product-details-view.html',
  styleUrl: './product-details-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsView {
  public prodEditPath = ROUTE_PATHS.products['editBase'];
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthenticationService);
  private orderService = inject(OrderService);
  private notificationService = inject(NotificationService);
  public $isAdmin = this.authService.$isAdmin;
  private productsService = inject(ProductsService);
  public $productId = signal(Number(this.route.snapshot.paramMap.get('id')));
  public productFromNavState = this.router.currentNavigation()?.extras?.state as Product; // Product details can be passed via router state when navigating to this view.
  public $product = toSignal(
    of(this.productFromNavState).pipe(
      switchMap((navProd) => {
        if (navProd && navProd.id === this.$productId()) {
          return of(navProd);
        }
        return this.productsService.getProductById(this.$productId());
      }),
    ),
  );
  public $quantityInCart = computed(() => {
    return this.setQuantityInCart(this.orderService.$cart());
  });

  addToCart(product: Product) {
    if (!product.id) return;
    console.log('Adding to cart:', product);
    this.orderService.addItem(product);
    this.notificationService.open('Product added', 'success');
  }

  setQuantityInCart(cartItems: CartItem[]) {
    if (!cartItems?.length) return false;
    const exists = cartItems.find((item) => item.productId === this.$productId());
    return exists ? exists.quantity : 0;
  }
}
