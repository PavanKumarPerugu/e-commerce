import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../models/products';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ECommerceStore } from '../../e-commerce-store';

@Component({
  selector: 'app-product-card',
  imports: [MatButton, MatIcon, CommonModule, MatIconButton],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();
  addToCartClicked = output<Product>();
  store = inject(ECommerceStore);
  isInWishlist = computed(() => this.store.wishlistItems().find(p => p.id === this.product().id));
  toggleWishlist(product: Product) {
    if(this.isInWishlist()) {
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishlist(product);
    }
  }
}
