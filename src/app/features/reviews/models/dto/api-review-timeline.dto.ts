export type Granularity = 'DAY' | 'WEEK' | 'MONTH';

export type ApiReviewTimelineItem = {
  startingPeriodDate: string;
	positive: number;
  neutral: number;
  negative: number;
};

export type ApiReviewTimeline = {
	granularity: Granularity;
	data: ApiReviewTimelineItem[];
};