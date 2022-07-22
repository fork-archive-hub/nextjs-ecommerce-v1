import { createRouter } from './context';
import { z } from 'zod';

export const productsRouter = createRouter()
	.query('all', {
		input: z.object({
			limit: z.number(),
			lastItemCreatedAt: z.string().optional(),
		}),
		async resolve({ ctx, input }) {
			return await ctx.prisma.product.findMany({
				select: {
					id: true,
					title: true,
					price: true,
					images: {
						select: {
							image: {
								select: {
									id: true,
									src: true,
									alt: true,
								},
							},
						},
					},
					categories: {
						select: {
							category: {
								select: {
									id: true,
									name: true,
									count: true,
									createdAt: true,
									images: {
										select: {
											image: {
												select: {
													id: true,
													src: true,
													alt: true,
												},
											},
										},
									},
								},
							},
						},
					},
					brand: {
						select: {
							id: true,
							createdAt: true,
							name: true,
							images: {
								select: {
									image: {
										select: {
											id: true,
											src: true,
											alt: true,
										},
									},
								},
							},
						},
					},
					description: true,
					status: true,
					countInStock: true,
					createdAt: true,
					updatedAt: true,
				},
				take: input.limit,
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
