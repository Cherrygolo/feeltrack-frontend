import { inject, Injectable } from "@angular/core";
import { ApiReviewTimelineItem, Granularity } from "../models/dto/api-review-timeline.dto";

/**
 * Service responsible for formatting timeline labels based on the 
 * granularity of the data (day, week, month).
 */
@Injectable({
  providedIn: 'root'
})
export class TimelineLabelService {

  formatLabel(item: ApiReviewTimelineItem, granularity: Granularity): string {

    const date = new Date(item.startingPeriodDate);

    switch (granularity) {

      case 'DAY':
        return this.formatDayLabel(date);

      case 'WEEK':
        return this.formatWeekLabel(date);

      case 'MONTH':
        return this.formatMonthLabel(date);

      default:
        return item.startingPeriodDate;
    }
  }

  /**
   * Formats a date as "dd/MM/yyyy" (e.g., "15/09/2024").
   * @param date : The date to format.
   * @returns A string representing the formatted date.
   */
  private formatDayLabel(date: Date): string {
    return date.toLocaleDateString('fr-FR');
  }

  /**
   * Formats a date as "MMMM yyyy" (e.g., "juin 2024").
   * @param date : The date to format.
   * @returns A string representing the formatted month label.
   */
  private formatMonthLabel(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric'
    });
  }

  /**
   * Formats a date as a week label (e.g., "Sem. 3 de juin 2024").
   * @param date : The date to format.
   * @returns A string representing the formatted week label.
   */
  private formatWeekLabel(date: Date): string {

    const weekOfMonth = this.getWeekOfMonth(date);
    const month = date.toLocaleDateString('fr-FR', { month: 'long' });
    const year = date.getFullYear();

    return `Sem. ${weekOfMonth} de ${month} ${year}`;
  }

  /**
   * Gets the week number within the month for a given date.
   * @param date : The date to calculate the week number for.
   * @returns A number representing the week number within the month.
   */
  private getWeekOfMonth(date: Date): number {

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    const offset = firstDay.getDay() || 7;

    return Math.ceil((date.getDate() + offset - 1) / 7);
}


}