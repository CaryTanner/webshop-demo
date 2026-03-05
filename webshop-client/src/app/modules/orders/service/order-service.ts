import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CartItem, CartStorage } from '../order.interface';
import { AuthenticationService } from '@module/authentication/service/authentication-service';
@Injectable({ providedIn: 'root' })
export class OrderService {
  private _cart = signal<CartItem[]>([]);
  public $cart = this._cart.asReadonly();
  public numberOfItemsInCart = computed(() => {
    return this._cart()?.length;
  });
  private CART_KEY = 'cart_key';

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

  addItem(item: CartItem) {
    this._cart.update((currentCart) => {
      return currentCart.map((cartItem) => {
        if (cartItem.productId === item.productId) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
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
}
