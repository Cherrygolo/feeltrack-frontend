import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Review } from "../models/review.model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private http = inject(HttpClient);

  getAllReviews() {
    return this.http.get<Review[]>('http://localhost:8080/api/review');
  }

  getAllReviewsByType(sentiment: string) {
    return this.http.get<Review[]>(`http://localhost:8080/api/review?type=${sentiment}`);
  }
}