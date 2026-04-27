import { Component, computed, inject, input } from '@angular/core';
import { ECommerceStore } from '../../e-commerce-store';
import { BackButton } from "../../components/back-button/back-button";
import { ProductInfo } from "./product-info/product-info";

@Component({
  selector: 'app-view-product-detail',
  imports: [BackButton, ProductInfo, ProductInfo],
  templateUrl: './view-product-detail.html',
  styleUrl: './view-product-detail.scss',
})
export default class ViewProductDetail {
  productId = input.required<string>();
  store = inject(ECommerceStore);
  constructor() {
    this.store.setProductId(this.productId);
  }
  backRoute = computed(() => {return `/products/${this.store.category()}`;
  });
}
