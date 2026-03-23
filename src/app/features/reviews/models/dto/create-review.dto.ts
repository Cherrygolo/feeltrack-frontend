import { Customer } from '@features/customers/models/customer.model';

export type CustomerDto = {
  email: string;
  phone?: string;
};

export type ReviewCreateDto = {
  text: string;
  customer: CustomerDto;
};