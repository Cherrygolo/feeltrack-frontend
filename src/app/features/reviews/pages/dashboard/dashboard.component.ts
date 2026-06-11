import { Component, computed, signal, ViewChild } from "@angular/core";
import { ReviewTypeRepartitionChartComponent } from "@features/reviews/components/charts/review-type-repartition-chart/review-type-repartition-chart.component";
import { ReviewEvolutionChartComponent } from "@features/reviews/components/charts/review-evolution-chart/review-evolution-chart.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReviewTypeRepartitionChartComponent, ReviewEvolutionChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  @ViewChild(ReviewTypeRepartitionChartComponent)
  reviewTypeRepartitionChart?: ReviewTypeRepartitionChartComponent;

  @ViewChild(ReviewEvolutionChartComponent)
  reviewEvolutionChart?: ReviewEvolutionChartComponent;

  reviewTypeRepartitionChartError = signal(false);
  reviewEvolutionChartError = signal(false);

  hasAnyError = computed(() =>
    this.reviewTypeRepartitionChartError() || this.reviewEvolutionChartError()
  );

  retryAll() {
    this.reviewTypeRepartitionChart?.retry();
    this.reviewEvolutionChart?.retry();
  }

}