import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Review, ReviewStats} from "../models/review.model";
import { map, Observable } from "rxjs";
import { ReviewCreateDto } from "../models/dto/create-review.dto";
import { ApiReviewStats } from "../models/dto/api-review-stats.dto";
import { ApiReviewTimeline } from "../models/dto/api-review-timeline.dto";
import { mapReviewStats } from "../mappers/review.mapper";
import { FAKE_REVIEW_STATS_API_RESPONSE } from "@test-data/fake-review-data";

import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}/review`;

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private http = inject(HttpClient);

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(API_URL);
  }

  getAllReviewsByType(reviewType: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${API_URL}?type=${reviewType}`);
  }

  getReviewStats(): Observable<ReviewStats> {
    return this.http.get<ApiReviewStats>(`${API_URL}/stats`).pipe(
      map(mapReviewStats)
    );
  }

  getReviewTimeline(days: number) {
    return this.http.get<ApiReviewTimeline>(`${API_URL}/stats/timeline?days=${days}`);
  }

  postReview(dto: ReviewCreateDto): Observable<Review> {
    return this.http.post<Review>(API_URL, dto);
  }
}