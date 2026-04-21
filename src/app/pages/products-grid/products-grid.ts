import { Component, computed, inject, input, signal } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from "@angular/router";
import { TitleCasePipe } from '@angular/common';
import { ECommerceStore } from '../../e-commerce-store';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatSidenavContainer, MatSidenavContent, MatSidenav, MatNavList, MatListItem, MatListItemTitle, RouterLink, TitleCasePipe, ToggleWishlistButton],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export default class ProductsGrid {

  category = input<string>('all');

  store = inject(ECommerceStore);
  
  categories = signal<string[]>(['all',   "electronics", "clothing", "home", "books", "fitness"]);

  constructor() {
    this.store.setCategory(this.category);
  }
}