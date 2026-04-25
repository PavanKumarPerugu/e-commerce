import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../models/products';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ECommerceStore } from '../../e-commerce-store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [MatButton, MatIcon, CommonModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();
  store = inject(ECommerceStore);
}
