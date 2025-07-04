import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductsService } from '../../services/products.service';
import { Category, Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private _productsService = inject(ProductsService);
  protected categories: Category[] = [];
  protected allProducts: Product[] = [];
  protected products: Product[] = [];

  protected selectedCategory: string = '';
  protected sortOrder: string = '';

  ngOnInit(): void {
    this._productsService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.allProducts = data;
        this.products = [...data];
      },
    });

    this._productsService.getAllCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
    });
  }

  protected onCategoryChange(e: Event){
    const selectElement = e.target as HTMLSelectElement;
    this.selectedCategory = selectElement.value;
    this.products = [];
    this.applyFilters();
  }

  onSortChange(e: Event): void {
    const selectElement = e.target as HTMLSelectElement;
    this.sortOrder = selectElement.value;
    this.products = [];
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.allProducts];

    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    if (this.sortOrder === 'low-to-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'high-to-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    this.products = filtered;
  }
}
