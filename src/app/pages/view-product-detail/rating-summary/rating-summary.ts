import { Component, computed, input } from '@angular/core';
import { Product } from '../../../models/products';
import { StarRating } from "../../../components/star-rating/star-rating";

@Component({
  selector: 'app-rating-summary',
  imports: [StarRating],
  templateUrl: './rating-summary.html',
  styleUrl: './rating-summary.scss',
})
export class RatingSummary {
  product = input.required<Product>();
  totalReviews = computed(() => this.product().reviews.length);
  ratingBreakdown = computed(() => {
    const reviws = this.product().reviews;
    const total = reviws.length;
    if (total === 0) return [5,4,3,2,1].map((stars) => ({
      stars, count: 0, percentage: 0,
    }));
    const counts = [5,4,3,2,1].map((stars) => {
      const count = reviws.filter(review => Math.round(review.rating) === stars).length;
      return { stars, count, percentage: (count / total) * 100 };
    }); 
    return counts;
  });
}
