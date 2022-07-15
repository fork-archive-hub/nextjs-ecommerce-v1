import { createRouter } from './context';
import { z } from 'zod';

export const exampleRouter = createRouter()
	.query('hello', {
		input: z
			.object({
				text: z.string().nullish(),
			})
			.nullish(),
		resolve({ input }) {
			return {
				greeting: `Hello ${input?.text ?? 'world'}`,
			};
		},
	})
	.query('getAllUsers', {
		async resolve({ ctx }) {
			return await ctx.prisma.user.findMany({
				select: {
					id: true,
					role: true,
					name: true,
					email: true,
					emailVerified: true,
					image: true,
					createdAt: true,
					// accounts?: boolean | AccountFindManyArgs
					// sessions?: boolean | SessionFindManyArgs
					// profile?: boolean | ProfileArgs
					// shippingAddress?: boolean | ShippingAddressFindManyArgs
					// _count?: boolean |
					profile: {
						select: {
							id: true,
							bio: true,
							sex: true,
							user: true,
							userId: true,
							createdAt: true,
							updatedAt: true,
						},
					},
				},
			});
		},
	});
