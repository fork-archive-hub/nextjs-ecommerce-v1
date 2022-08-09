import { z } from 'zod';

export const productsFilteredByZodInputs = z.object({
	limit: z.number().optional(),
	countInStock: z
		.object({
			gte: z.number().min(1).optional(),
			lte: z.number().min(1).optional(),
		})
		.optional(),
	price: z
		.object({
			gte: z.number().min(1).optional(),
			lte: z.number().min(1).optional(),
		})
		.optional(),
	brandName: z.string().optional(),
	title: z.string().optional(),
	createdAt: z.date().optional(),
	categoriesNames: z.array(z.string()).min(1).optional(),
});
