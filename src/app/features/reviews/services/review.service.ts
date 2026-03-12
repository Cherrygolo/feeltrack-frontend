import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Review } from "../models/review.model";
import { Observable } from "rxjs";
import { ReviewCreateDto } from "../models/review-create.dto";

const API_URL = 'http://localhost:8080/api/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private http = inject(HttpClient);

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(API_URL);
  }

  getAllReviewsByType(sentiment: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${API_URL}?type=${sentiment}`);
  }

  postReview(dto: ReviewCreateDto): Observable<Review> {
    return this.http.post<Review>(API_URL, dto);
  }
}