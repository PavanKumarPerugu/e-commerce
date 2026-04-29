 import { Component, inject, signal } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { MatInput, MatFormField, MatLabel } from "@angular/material/input";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { OptionItem } from '../../../models/option-item';
import { MatAnchor } from "@angular/material/button";
import { ECommerceStore } from '../../../e-commerce-store';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { AddReviewParams } from '../../../models/user-review';

@Component({
  selector: 'app-write-review',
  imports: [ViewPanel, MatInput, MatFormField, MatLabel, ɵInternalFormsSharedModule, MatAnchor, ReactiveFormsModule, MatSelect, MatOption],
  templateUrl: './write-review.html',
  styleUrl: './write-review.scss',
  host: {
    display: 'block',
  }
})
export class WriteReview {
  store = inject(ECommerceStore);
  fb = inject(NonNullableFormBuilder);
  ratingOptions = signal<OptionItem[]>([
    {label: '5 stars - Excellent', value: 5},
    {label: '4 stars - Good', value: 5},
    {label: '3 stars - Average', value: 5},
    {label: '2 stars - Poor', value: 5},
    {label: '1 stars - Terrible', value: 5},
  ]);
  reviewForm = this.fb.group({
    title: ['', Validators.required],
    comment: ['', Validators.required],
    rating: [5, Validators.required],
  });
  saveReview(){
    if (!this.reviewForm.valid) {
      this.reviewForm.markAllAsTouched();
      return;
    }
    const { title, comment, rating } = this.reviewForm.value;
    this.store.addReview({ title, comment, rating } as AddReviewParams);
  };
}
