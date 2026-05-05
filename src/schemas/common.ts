import { z } from 'zod';

export const errorParameterSchema = z.object({
  name: z.string().optional(),
  value: z.string().optional(),
});

export const errorSchema = z.object({
  category: z.string().optional(),
  domain: z.string().optional(),
  errorId: z.number().int().optional(),
  inputRefIds: z.array(z.string()).optional(),
  longMessage: z.string().optional(),
  message: z.string().optional(),
  outputRefIds: z.array(z.string()).optional(),
  parameters: z.array(errorParameterSchema).optional(),
  subdomain: z.string().optional(),
});

export const amountSchema = z.object({
  currency: z.string().optional(),
  value: z.string().optional(),
});

export const timeDurationSchema = z.object({
  unit: z.string().optional(),
  value: z.number().int().optional(),
});

export const dateTimeSchema = z.string().datetime();

export const addressSchema = z.object({
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  county: z.string().optional(),
  postalCode: z.string().optional(),
  stateOrProvince: z.string().optional(),
});

export const paginationOutputSchema = z.object({
  href: z.string().optional(),
  limit: z.number().int().optional(),
  next: z.string().optional(),
  offset: z.number().int().optional(),
  prev: z.string().optional(),
  total: z.number().int().optional(),
});

export const textSchema = z.string();

export const errorDataSchema = errorSchema;
