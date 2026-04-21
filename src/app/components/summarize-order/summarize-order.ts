import { Component, inject, computed } from '@angular/core';
import { ViewPanel } from '../../directives/view-panel';
import { ECommerceStore } from '../../e-commerce-store';
import { CartItem } from '../../models/cart';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel],
  templateUrl: './summarize-order.html',
  styleUrl: './summarize-order.scss',
})
export class SummarizeOrder {
  store = inject(ECommerceStore);

  subtotal = computed(() =>
    Math.round(this.store.cartItems().reduce(
      (acc: number, item: CartItem) =>
        acc + item.product.price * item.quantity,
      0
    )
  ));

  tax =  computed(() => Math.round(0.05 * this.subtotal()));

  total = computed(() => Math.round(this.subtotal() + this.tax()));
}
