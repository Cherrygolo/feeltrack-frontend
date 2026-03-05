import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Review } from '@features/reviews/models/review.model';

@Component({
  selector: 'app-review-card',
  imports: [
    NgClass
  ],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss',
})
export class ReviewCardComponent {

  @Input() review!: Review;

  get sentimentClass(): string {
    return this.review.type.toLowerCase();
  }
}
