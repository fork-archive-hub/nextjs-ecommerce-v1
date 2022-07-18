import { createRouter } from './context';
import { z } from 'zod';

export const productsRouter = createRouter()
	.query('all', {
		input: z
			.object({
				lastItemCreatedAt: z.string(),
			})
			.optional(),
		async resolve({ ctx }) {
			return await ctx.prisma.product.findMany({
				select: {
					id: true,
					title: true,
					price: true,
					image: true,
					brand: true,
					description: true,
					status: true,
					countInStock: true,
					createdAt: true,
					updatedAt: true,
				},
			});
		},
	})
	.query('byId', {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ ctx, input }) {
			return await ctx.prisma.product.findUnique({
				where: {
					id: input.id,
				},
			});
		},
	});
