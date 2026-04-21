import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { ECommerceStore } from '../../e-commerce-store';
import { ProductCard } from '../../components/product-card/product-card';
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-my-wishlist',
  imports: [BackButton, ProductCard, MatIcon, MatIconButton, MatButton],
  templateUrl: './my-wishlist.html',
  styleUrl: './my-wishlist.scss',
})
export default class MyWishlist {
  store = inject(ECommerceStore);
}
