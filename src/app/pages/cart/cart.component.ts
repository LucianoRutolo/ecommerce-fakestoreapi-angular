import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';
import { ProductsService } from '../../services/products.service';
import { combineLatest } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  imports: [RouterModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private _productsService = inject(ProductsService);
  private _cartService = inject(CartService);
  protected $cartItems = this._cartService.$cartItemsDouble;

  protected readonly $productsInCart = signal<Product[]>([]);

  constructor() {
    effect(() => {
      const items = this.$cartItems();

      if (items.length === 0) {
        this.$productsInCart.set([]);
        return;
      }

      const productObservables = items.map((item) =>
        this._productsService.getProductById(item.productId)
      );

      combineLatest(productObservables).subscribe({
        next: (products) => this.$productsInCart.set(products),
        error: (err) => console.error('Error:', err),
      });
    });
  }

  removeToCart(id: number): void {
    this._cartService.removeFromCart(id);
  }

  getTotal(): number {
    return this.$productsInCart().reduce((acc, curr) => acc + curr.price, 0);
  }
}
