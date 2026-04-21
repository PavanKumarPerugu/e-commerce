import { Component, inject, input, computed } from '@angular/core';
import { ECommerceStore } from '../../e-commerce-store';
import { Product } from '../../models/products';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [ MatIconButton, MatIcon],
  templateUrl: './toggle-wishlist-button.html',
  styleUrl: './toggle-wishlist-button.scss',
})
export class ToggleWishlistButton {
  product = input.required<Product>();
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
