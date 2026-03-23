import { Customer } from '@features/customers/models/customer.model';

export type ReviewType = 'ALL' | 'NEGATIVE' | 'NEUTRAL' | 'POSITIVE';

export type ReviewStats = Record<ReviewType, number>;

export type Review = {
  id: string;
  text: string;
  type: ReviewType;
  customer: Customer;
};