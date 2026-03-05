import { Component } from '@angular/core';
import { ReviewCardComponent } from '../../components/review-card/review-card.component';
import { FAKE_REVIEWS } from '@test-data/fake-review-data';

@Component({
  selector: 'app-review-list',
  imports: [
    ReviewCardComponent
  ],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss',
})
export class ReviewListComponent {
  protected readonly reviews = FAKE_REVIEWS;
}
