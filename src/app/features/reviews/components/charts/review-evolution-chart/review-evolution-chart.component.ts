import { Component, signal, inject, computed, effect, EventEmitter, Output } from '@angular/core';
import { ReviewService } from '@features/reviews/services/review.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ChartColorService } from 'src/app/shared/services/chart-color.service';
import { ApiReviewTimeline, Granularity } from '@features/reviews/models/dto/api-review-timeline.dto';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { TimelineLabelService } from '@features/reviews/services/timeline-label.service';


@Component({
  selector: 'app-review-evolution-chart',
  standalone: true,
  imports: [SpinnerComponent, BaseChartDirective,FormsModule],
  templateUrl: './review-evolution-chart.component.html',
  styleUrl: './review-evolution-chart.component.scss',
})
export class ReviewEvolutionChartComponent {

  private reviewService = inject(ReviewService);
  private chartColorService = inject(ChartColorService);
  private timelineLabelService = inject(TimelineLabelService);

  // state simple (maîtrisé)
  selectedDays = signal(30);

  loading = signal(false);
  error = signal<string | null>(null);
  data = signal<ApiReviewTimeline>( { granularity: 'DAY', data: [] } );

  @Output() errorChange = new EventEmitter<boolean>();

  // chart states

  lineChartData = signal<ChartConfiguration<'line'>['data']>({
    labels: [],
    datasets: []
  });

  lineChartOptions = signal<ChartOptions<'line'>>({});

  constructor() {

    // refetch automatique quand la période change
    effect(() => {
      const days = this.selectedDays();
      this.fetchTimeline(days);
    });

  }

  // API call contrôlée
  private fetchTimeline(days: number) {

    this.loading.set(true);
    this.error.set(null);

    this.reviewService.getReviewTimeline(days).subscribe({
      next: (res) => {
        this.data.set(res);
        this.buildChart(res);
        this.loading.set(false);
        this.errorChange.emit(false);
      },
      error: (err) => {
        console.log('Error fetching review timeline:', err);
        this.error.set(err?.userMessage ?? 'Erreur lors du chargement');
        this.loading.set(false);
        this.errorChange.emit(true);
      }
    });

  }

  // build chart
  private buildChart(timelineData: ApiReviewTimeline) {

    const labels = timelineData.data.map(item => {
      const granularity = timelineData.granularity;
      return this.timelineLabelService.formatLabel(item, granularity);
    });

    const colors = [
      this.chartColorService.get('bg-positive'),
      this.chartColorService.get('bg-neutral'),
      this.chartColorService.get('bg-negative'),
    ];

    this.lineChartData.set({
      labels,
      datasets: [
        {
          label: 'Positif',
          data: timelineData.data.map(i => i.positive),
          borderColor: colors[0],
          backgroundColor: colors[0],
          fill: false,
          tension: 0.3
        },
        {
          label: 'Neutre',
          data: timelineData.data.map(i => i.neutral),
          borderColor: colors[1],
          backgroundColor: colors[1],
          fill: false,
          tension: 0.3
        },
        {
          label: 'Négatif',
          data: timelineData.data.map(i => i.negative),
          borderColor: colors[2],
          backgroundColor: colors[2],
          fill: false,
          tension: 0.3
        }
      ]
    });

    this.lineChartOptions.set({
      responsive: true,
      maintainAspectRatio: false,
      animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
      }
    },
      plugins: {
        title: {
          display: true,
          text: `Évolution des avis (${this.selectedDays()} jours)`,
          font: { size: 16, weight: 'bold' },
          padding: { top: 10, bottom: 20 },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        }
      },
      interaction: {
        mode: 'nearest',
        intersect: false
      }
    });
  }

  /**
   * format chart label based on granularity
   * @param dateStringToFormat : date string to format
   * @param granularity 
   * @returns formatted label
   */
  private formatLabel( dateStringToFormat: string, granularity: Granularity
  ): string {

    const date = new Date(dateStringToFormat);

    switch (granularity) {

      case 'DAY':
        return date.toLocaleDateString('fr-FR');

      case 'WEEK':
        return `Sem. du ${date.toLocaleDateString('fr-FR')}`;

      case 'MONTH':
        return date.toLocaleDateString(
          'fr-FR',
          { month: 'short', year: 'numeric' }
        );
    }
  }

  retry() {
    this.fetchTimeline(this.selectedDays());
  }

  // update selected period
  onPeriodChange(value: string) {
    this.selectedDays.set(Number(value));
  }

  // helpers UI
  isLoading = computed(() => this.loading());
  hasError = computed(() => this.error() !== null);
  errorMessage = computed(() => this.error());

}