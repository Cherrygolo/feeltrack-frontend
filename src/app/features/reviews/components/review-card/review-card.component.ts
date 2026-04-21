import { DatePipe, NgClass } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { Review } from '@features/reviews/models/review.model';
import { MaskEmailPipe } from 'src/app/shared/pipes/MaskEmailPipe';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [
    NgClass,
    MaskEmailPipe,
    DatePipe
  ],
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss'],
})
export class ReviewCardComponent {

  @Input() review!: Review;
  @Input() highlight = false;

  highlightReviewId: string | null = null;

  // signal to manage highlight state for the review card after creation
  isHighlight = signal(false);

  ngAfterViewInit() {
    if (this.highlight) {
      // activate highlight state when the component is initialized with highlight input true
      this.isHighlight.set(true);
      // disable transition after 1.5s
      setTimeout(() => this.isHighlight.set(false), 1500);
    }
  }

  get sentimentClass(): string {
    return this.review.type.toLowerCase();
  }
}
