import { createRouter } from './context';
import { z } from 'zod';

export const productsRouter = createRouter().query('byId', {
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
