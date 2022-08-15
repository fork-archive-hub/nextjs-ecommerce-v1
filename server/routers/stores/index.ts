import { createRouter } from '../context';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const storesRouter = createRouter()
	.middleware(async ({ ctx, next }) => {
		if (
			typeof ctx.session?.user.role !== 'string' ||
			!['ADMIN', 'SELLER'].includes(ctx.session.user.role)
		)
			throw new TRPCError({ code: 'UNAUTHORIZED' });

		return next();
	})
	.query('getStores', {
		input: z
			.object({
				cursor: z
					.object({
						createdAt: z.date(),
					})
					.optional(),
			})
			.optional(),
		resolve: async ({ ctx, input }) => {
			const userId = ctx.session?.user.id as string;

			const data = await ctx.prisma.store.findMany({
				// take: 4,
				where: {
					AND: {
						sellerId: userId,
						createdAt: {
							gt: input?.cursor?.createdAt,
						},
					},
				},
				orderBy: {
					createdAt: 'asc',
				},
				include: {
					address: true,
				},
			});

			return data;
		},
	})
	.mutation('createOne', {
		input: z.object({
			title: z.string(),
			description: z.string(),
			address: z.object({
				country: z.string(),
				city: z.string(),
				address: z.string(),
				postalCode: z.string().optional(),
			}),
		}),
		resolve: async ({ ctx, input }) => {
			const userId = ctx.session?.user.id as string;

			const addressCreated = await ctx.prisma.address.create({
				data: {
					country: input.address.country,
					city: input.address.city,
					address: input.address.address,
					postalCode: input.address.postalCode,
				},
			});

			const storeCreated = await ctx.prisma.store.create({
				data: {
					sellerId: userId,
					title: input.title,
					description: input.description,
					addressId: addressCreated.id,
				},
			});

			return { store: storeCreated, address: addressCreated };
		},
	});

// Address need to be deleted separately
// For some reason there is an error in productsCounter
