import { Component, computed, effect, inject, signal } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { ReviewService } from '@features/reviews/services/review.service';
import { ReviewCardComponent } from '@features/reviews/components/review-card/review-card.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { ReviewType } from '@features/reviews/models/review.model';
import { createAsyncState } from 'src/app/shared/utils/create-async-state';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [
    ReviewCardComponent,
    SpinnerComponent,
    NgClass
  ],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss',
})
export class ReviewListComponent {

  private reviewService = inject(ReviewService);

  reviewType = signal<ReviewType>('ALL');

  loadingMessage = signal('Chargement des avis en cours...');

  private loadingTimeouts: ReturnType<typeof setTimeout>[] = [];

  // highlight state after review creation
  highlightReviewId: string | null = null;

  filters = [
    { value: 'ALL', label: 'Tous' },
    { value: 'POSITIVE', label: '😊 Positif' },
    { value: 'NEUTRAL', label: '😐 Neutre' },
    { value: 'NEGATIVE', label: '😡 Négatif' }
  ];

  statsState = createAsyncState(() =>
    this.reviewService.getReviewStats()
  );

  reviewsState = createAsyncState(() => {
    const type = this.reviewType();

    return type === 'ALL'
      ? this.reviewService.getAllReviews()
      : this.reviewService.getAllReviewsByType(type);
  });

  constructor() {
    
    // Initial loads
    this.statsState.run();

    effect(() => {
      this.reviewType();
      this.reviewsState.run();
    });

    effect(() => {
      if (this.globalLoading()) {
        this.startLoadingMessages();
      } else {
        this.stopLoadingMessages();
      }
    });

    // Handle navigation highlight (one-shot trigger)
    const navigation = history.state;
    if (navigation.reviewCreated) {
      // Trigger highlight animation for created review which the ID is known
      this.highlightReviewId = navigation.createdReviewId;

      // Clear history state to avoid re-trigger on navigation
      window.history.replaceState({}, document.title);

      // Reset highlight after it has been consumed
      this.resetHighlightAfterRender();
    }
  }

  /**
   * Reset highlight once reviews are rendered
   */
  private resetHighlightAfterRender() {
    effect(() => {
      const reviews = this.reviewsState.data();

      if (reviews && this.highlightReviewId) {
        setTimeout(() => {
          this.highlightReviewId = null;
        }, 2000);
      }
    });
  }

  private startLoadingMessages(): void {
    // Nettoyage des anciens timers
    this.loadingTimeouts.forEach(clearTimeout);
    this.loadingTimeouts = [];

    // Initial message
    this.loadingMessage.set('Chargement des avis en cours...');

    // After 2 s
    this.loadingTimeouts.push(
      setTimeout(() => {
        if (this.globalLoading()) {
          this.loadingMessage.set('Initialisation des données...');
        }
      }, 2000)
    );

    // After 10 s
    this.loadingTimeouts.push(
      setTimeout(() => {
        if (this.globalLoading()) {
          this.loadingMessage.set(
            'Le serveur démarre, cela peut prendre quelques instants...'
          );
        }
      }, 10000)
    );
  }

  private stopLoadingMessages(): void {
    this.loadingTimeouts.forEach(clearTimeout);
    this.loadingTimeouts = [];
  }


  onFilterChange(type: ReviewType) {
    if (this.reviewType() === type) return;
    this.reviewType.set(type);
  }

  // Global derived states
  globalLoading = computed(() =>
    this.statsState.loading() || this.reviewsState.loading()
  );

  globalError = computed(() =>
    this.statsState.error() || this.reviewsState.error()
  );

  isReady = computed(() =>
    !this.globalLoading() && !this.globalError()
  );

  reloadAll() {
    this.statsState.retry();
    this.reviewsState.retry();
  }

}