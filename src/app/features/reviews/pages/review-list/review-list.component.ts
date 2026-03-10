import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';  
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
import { ReviewCardComponent } from '../../components/review-card/review-card.component';
import { ReviewService } from '@features/reviews/services/review.service';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { BehaviorSubject, catchError, finalize, Observable, of, switchMap } from 'rxjs';
import { Review } from '@features/reviews/models/review.model';

@Component({
  selector: 'app-review-list',
  imports: [
    ReviewCardComponent,
    AsyncPipe,
    SpinnerComponent,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss',
})
export class ReviewListComponent {
  
  private reviewService = inject(ReviewService);
  reviews$!: Observable<Review[]>;
  loading = false;
  errorMessage = '';
  
  private reviewType$ = new BehaviorSubject<string>('ALL');
  selectedReviewType = 'ALL';

  ngOnInit(): void {

    // Initialize the reviews$ observable to react to changes in the review type
    this.reviews$ = this.reviewType$.pipe(

      switchMap(reviewType => {

        this.errorMessage = '';
        this.loading = true;

        const request$ =
          reviewType === 'ALL'
            ? this.reviewService.getAllReviews()
            : this.reviewService.getAllReviewsByType(reviewType);

        return request$.pipe(
          catchError((error) => {
            this.errorMessage = `Erreur lors du chargement des avis : ${error.userMessage || 'Une erreur est survenue.'}`;
            return of([]);
          }),
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

  reloadReviews() {
    this.reviewType$.next(this.selectedReviewType);
  }
}
