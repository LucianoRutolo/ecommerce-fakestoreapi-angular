import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  protected _cartService = inject(CartService);
  protected isInCart: boolean = false;
  @Input() product!: Product;

  ngOnInit(): void {
    this.isInCart = this._cartService.isItemInCart(this.product.id);
  }

  addToCart(id: number, q: number = 1): void {
    const item: CartItem = { productId: id, quantity: q };
    this._cartService.addToCart(item);
    this.isInCart = true;
  }

  removeToCart(id: number): void {
    this._cartService.removeFromCart(id);
    this.isInCart = false;
  }
}
