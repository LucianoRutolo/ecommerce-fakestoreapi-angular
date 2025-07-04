import { computed, effect, Injectable, signal } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';
import { LoginService } from './login.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  protected readonly $cart = signal<Cart | null>(null);
  protected readonly $cartItems = signal<CartItem[]>([]);

  constructor(
    private _loginService: LoginService,
    private _usersService: UsersService
  ) {
    effect(() => {
      const user = this._loginService.user;
      if (user()) {
        this._usersService.getCartFromUser(user()!.id).subscribe({
          next: (data: Cart[]) => {
            this.$cart.set(data[0]);
            this.$cartItems.set(data[0].products);
          },
        });
      }
    });
  }

  get $cartItemsDouble() {
    return computed(() => this.$cartItems());
  }
  
  get $cartDouble() {
    return computed(() => this.$cart());
  }

  addToCart(product: CartItem): void {
    this.$cartItems.update((items) => [...items, product]);
  }

  removeFromCart(id: number | string): void {
    this.$cartItems.update((items) => items.filter((p) => p.productId !== id));
  }

  clearCart(): void {
    this.$cartItems.set([]);
  }

  isItemInCart(id: number | string): boolean {
    return this.$cartItems().some((i) => i.productId == id);
  }
}
