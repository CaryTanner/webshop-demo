import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CartItem, CartStorage, Order } from '../order.interface';
import { Product } from '@module/products/product.interface';
import currencyJs from 'currency.js';
import { BASE_URL } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { of, switchMap, tap } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private _cart = signal<CartItem[]>([]);
  public $cart = this._cart.asReadonly();
  public $numberCartItems = computed(() => {
    return this._cart()?.length;
  });
  private CART_KEY = 'cart_key';
  public $cartTotal = computed(() => {
    const cartItems = this._cart();
    if (!cartItems?.length) return 0;
    const total = cartItems.reduce((sum, item) => {
      return sum.add(currencyJs(item.unitPrice).multiply(item.quantity));
    }, currencyJs(0));
    return total.value;
  });

  constructor() {
    // reload cart from storage on init
    this.loadCart();

    // save cart whenever it changes
    effect(() => {
      this._cart();
      this.saveCart();
    });
  }

  private loadCart() {
    const cartStorage = this.parseCartStorage();

    if (!cartStorage?.savedAt || !cartStorage?.items?.length) {
      return;
    }

    const savedAt = new Date(cartStorage.savedAt);
    const daysSinceSaved = (Date.now() - savedAt.getTime()) / (1000 * 60 * 60 * 24);

    if (daysSinceSaved > 30) {
      localStorage.removeItem(this.CART_KEY);
      return;
    }
    this._cart.set(cartStorage.items);
  }

  parseCartStorage(): CartStorage {
    const emptyCart = { items: [], savedAt: '' };
    try {
      const cartStr = localStorage.getItem(this.CART_KEY);
      if (cartStr) {
        const cartStorage: CartStorage = JSON.parse(cartStr);
        return cartStorage;
      }
      return emptyCart;
    } catch {
      // eslint-disable-next-line no-console
      console.info('Cart in storage invalid - removing');
      localStorage.removeItem(this.CART_KEY);
      return emptyCart;
    }
  }

  private saveCart() {
    const cartStorage: CartStorage = {
      items: this._cart(),
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(this.CART_KEY, JSON.stringify(cartStorage));
  }

  addItem(product: Product) {
    const exists = this._cart().find((item) => item.productId === product.id);
    if (exists) {
      return this.updateItemQuantity(product.id, exists.quantity + 1);
    }
    this._cart.update((currentCart) => {
      return [
        ...currentCart,
        { quantity: 1, unitPrice: product.price, productId: product.id, product },
      ];
    });
  }

  updateItemQuantity(productId: number, quantity: number) {
    this._cart.update((currentCart) => {
      return currentCart.map((cartItem) => {
        if (cartItem.productId === productId) {
          return { ...cartItem, quantity: quantity };
        }
        return cartItem;
      });
    });
  }

  removeItem(productId: number) {
    this._cart.update((currentCart) => {
      return currentCart.filter((cartItem) => {
        return cartItem.productId !== productId;
      });
    });
  }

  clearCart() {
    this._cart.set([]);
  }

  createOrder(orderData: Partial<Order>) {
    const { userId, items, payment, shipping } = orderData;
    if (!userId || !items?.length || !payment || !shipping) {
      throw new Error('Missing required order data');
    }
    return this.http.post<Order>(`${BASE_URL}/orders`, { userId }).pipe(
      switchMap((savedOrder) => {
        console.log('order saved, now processing payment', savedOrder);
        if (!savedOrder?.id) {
          throw new Error('Order creation failed');
        }
        const orderItemsPayload = items.map((item) => ({
          ...item,
          orderId: savedOrder.id,
        }));
        return this.http.put<Order>(`${BASE_URL}/orders/${savedOrder.id}`, {
          ...savedOrder,
          items: orderItemsPayload,
          payment: { ...payment, orderId: savedOrder.id },
          shipping: { ...shipping, orderId: savedOrder.id },
        });
      }),
      tap((x) => console.log('payment processed, order complete', x)),
    );
  }
}
