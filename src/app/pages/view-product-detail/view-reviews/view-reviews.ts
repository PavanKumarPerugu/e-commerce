import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/products';
import { ViewPanel } from '../../../directives/view-panel';
import { RatingSummary } from '../rating-summary/rating-summary';

@Component({
  selector: 'app-view-reviews',
  imports: [ViewPanel, RatingSummary],
  templateUrl: './view-reviews.html',
  styleUrl: './view-reviews.scss',
})
export class ViewReviews {
  product = input.required<Product>();
}
