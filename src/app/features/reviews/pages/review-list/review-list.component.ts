import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';  
import { ReviewCardComponent } from '../../components/review-card/review-card.component';
import { ReviewService } from '@features/reviews/services/review.service';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { finalize } from 'rxjs';

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
  loading = true;
  reviews$ = this.reviewService.getAllReviews().pipe(
    finalize(() => this.loading = false)
  );
}
