import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';  
import { ReviewCardComponent } from '../../components/review-card/review-card.component';
import { ReviewService } from '@features/reviews/services/review.service';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { BehaviorSubject, finalize, Observable, switchMap } from 'rxjs';
import { Review } from '@features/reviews/models/review.model';

@Component({
  selector: 'app-review-list',
  imports: [
    ReviewCardComponent,
    AsyncPipe,
    SpinnerComponent
  ],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss',
})
export class ReviewListComponent {
  
  private reviewService = inject(ReviewService);
  reviews$!: Observable<Review[]>;
  loading = false;
  private reviewType$ = new BehaviorSubject<string>('ALL');
  selectedReviewType = 'ALL';

  ngOnInit(): void {

    // Initialize the reviews$ observable to react to changes in the review type
    this.reviews$ = this.reviewType$.pipe(

      switchMap(reviewType => {

        this.loading = true;

        if (reviewType === 'ALL') {
          return this.reviewService.getAllReviews().pipe(
            finalize(() => this.loading = false)
          );
        }

        return this.reviewService.getAllReviewsByType(reviewType).pipe(
          finalize(() => this.loading = false)
        );

      })

    );

  }

  onFilterChange(reviewType: string) {

    // If the selected review type is the same as the current one, do nothing
    if (this.selectedReviewType === reviewType) {
      return;
    }

    // Update the selected review type for UI purposes
    this.selectedReviewType = reviewType;

    // Update the review type to trigger the BehaviorSubject stream
    this.reviewType$.next(reviewType);

  }
}
