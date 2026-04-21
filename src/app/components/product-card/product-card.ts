import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../models/products';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [MatButton, MatIcon, CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();
  addToCartClicked = output<Product>();

}
