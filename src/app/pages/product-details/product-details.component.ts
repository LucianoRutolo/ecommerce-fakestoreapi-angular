import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private _cartService = inject(CartService);
  private _productsService = inject(ProductsService);
  private _route = inject(ActivatedRoute);
  protected product?: Product;
  protected isInCart: boolean = false;

  ngOnInit(): void {
    
    this._route.params.subscribe({
      next: (params: Params) => {
        const id = Number(params['id'])
        this.isInCart = this._cartService.isItemInCart(id);
        this._productsService.getProductById(id).subscribe({
          next: (data: Product) => {
            this.product = data;
          },
        });
      },
    });
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
