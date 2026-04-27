import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../models/products';
import { TitleCasePipe } from '@angular/common';
import { StockStatus } from '../stock-status/stock-status';
import { QtySelector } from "../../../components/qty-selector/qty-selector";
import { RouterLink } from "@angular/router";
import { ECommerceStore } from '../../../e-commerce-store';
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-info',
  imports: [TitleCasePipe, StockStatus, QtySelector, RouterLink, MatIcon, MatButtonModule],
  templateUrl: './product-info.html',
  styleUrl: './product-info.scss',
})
export class ProductInfo {
  store = inject(ECommerceStore);
  product = input.required<Product>();
  quantity = signal(1);
}
