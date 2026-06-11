import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReviewCreateDto } from '@features/reviews/models/dto/create-review.dto';
import { ReviewService } from '@features/reviews/services/review.service';
import { delay, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-review-creation-form',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './review-creation-form.component.html',
  styleUrl: './review-creation-form.component.scss',
})
export class ReviewCreationFormComponent {

  private reviewService = inject(ReviewService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  reviewForm = this.formBuilder.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
    phone: ['', { validators: [Validators.pattern(/^\d{10}$/)] }],
    review: ['', { validators: [Validators.required] }]
  });

  // Signals for form submission state
  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal(false);

  errorMessage = '';

  submitReview() {

    this.errorMessage = '';
    if (!this.reviewForm.valid) {
      this.reviewForm.markAllAsTouched();
      return;
    } else {
      // DTO construction from form values to be sent to the backend
      const reviewDto: ReviewCreateDto = {
        text: this.reviewForm.value.review!,
        customer: {
          email: this.reviewForm.value.email!,
          phone: this.reviewForm.value.phone || undefined,
        },
      };

      console.log('review created dto : ', reviewDto);

      this.isSubmitting.set(true);
      this.submitSuccess.set(false);
      this.submitError.set(false);

      this.reviewService.postReview(reviewDto).pipe(
        tap(() => this.submitSuccess.set(true)),
        delay(1500),
        tap((response) => {
          this.router.navigate(['/reviews'], {
            state: { reviewCreated: true, createdReviewId: response.id }
          });
        }),
        finalize(() => this.isSubmitting.set(false))
      ).subscribe({
        error: (error) => {
          this.submitError.set(true);
          this.errorMessage = error.userMessage;
        }
      });
    
    }
  }

  get submitButtonLabel(): string {
    if (this.isSubmitting()) return 'Envoi…';
    if (this.submitError()) return 'Réessayer';
    return 'Envoyer';
  }

  get isSubmitButtonDisabled(): boolean {
    return this.reviewForm.invalid || this.isSubmitting();
  }


}
