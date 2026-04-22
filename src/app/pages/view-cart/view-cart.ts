import { Component, inject } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { ListCartItems } from './list-cart-items/list-cart-items';
import { TeaseWishlist } from '../tease-wishlist/tease-wishlist';
import { SummarizeOrder } from '../../components/summarize-order/summarize-order';
import { ECommerceStore } from '../../e-commerce-store';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-cart',
  imports: [BackButton, ListCartItems, TeaseWishlist, SummarizeOrder, MatButtonModule],
  templateUrl: './view-cart.html',
  styleUrl: './view-cart.scss',
})
export default class ViewCart {
  store = inject(ECommerceStore);
}
