import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap, catchError, finalize, of } from 'rxjs';
import { ReviewService } from '@features/reviews/services/review.service';
import { ReviewCardComponent } from '@features/reviews/components/review-card/review-card.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

@Component({
  selector: 'app-review-list',
  imports: [
    ReviewCardComponent,
    AsyncPipe,
    SpinnerComponent,
    NgClass
  ],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss',
})
export class ReviewListComponent {

  private reviewService = inject(ReviewService);

  reviewType = signal<ReviewType>('ALL');

  loading = true;
  errorMessage = '';

  filters = [
    { value: 'ALL', label: 'Tous' },
    { value: 'POSITIVE', label: '😊 Positif' },
    { value: 'NEUTRAL', label: '😐 Neutre' },
    { value: 'NEGATIVE', label: '😡 Négatif' }
  ];

  // highlight state after review creation
  highlightReviewId: string | null = null;

  constructor() {
    const navigation = history.state;
    if (navigation.reviewCreated) {
      this.highlightReviewId = navigation.createdReviewId;
      // Clear the history state to prevent unintended highlights on future navigations
      window.history.replaceState({}, document.title);
    }
  }

  reviews$ = toObservable(this.reviewType).pipe(

    switchMap(type => {

      this.loading = true;
      this.errorMessage = '';

      const request$ =
        type === 'ALL'
          ? this.reviewService.getAllReviews()
          : this.reviewService.getAllReviewsByType(type);

      return request$.pipe(
        catchError(error => {
          this.errorMessage = `Erreur lors du chargement : ${error.userMessage}`;
          return of([]);
        }),
        finalize(() => this.loading = false)
      );

    })

  );

  onFilterChange(type: ReviewType) {
    if (this.reviewType() === type) return;
    this.reviewType.set(type);
  }

  reloadReviews() {
    this.reviewType.set(this.reviewType());
  }

}