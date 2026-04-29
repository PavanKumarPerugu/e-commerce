import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../models/products';
import { ViewPanel } from '../../../directives/view-panel';
import { RatingSummary } from '../rating-summary/rating-summary';
import { ViewReviewItem } from "../../view-product-details/view-review-item/view-review-item";
import { MatAnchor, MatButton } from "@angular/material/button";
import { ECommerceStore } from '../../../e-commerce-store';
import { WriteReview } from "../../view-product-details/write-review/write-review";

@Component({
  selector: 'app-view-reviews',
  imports: [ViewPanel, RatingSummary, ViewReviewItem, MatAnchor, MatButton, WriteReview],
  templateUrl: './view-reviews.html',
  styleUrl: './view-reviews.scss',
})
export class ViewReviews {
  product = input.required<Product>();
  store = inject(ECommerceStore);
}
