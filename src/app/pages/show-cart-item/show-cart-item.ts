import { Component, computed, inject, input } from '@angular/core';
import { CartItem } from '../../models/cart';
import { QtySelector } from "../../components/qty-selector/qty-selector";
import { ECommerceStore } from '../../e-commerce-store';
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-show-cart-item',
  imports: [QtySelector, MatIcon, MatIconButton, RouterLink],
  templateUrl: './show-cart-item.html',
  styleUrl: './show-cart-item.scss',
})
export class ShowCartItem {
  item = input.required<CartItem>();
  store = inject(ECommerceStore);
  total = computed(() => (this.item().product.price * this.item().quantity).toFixed(2));
}
