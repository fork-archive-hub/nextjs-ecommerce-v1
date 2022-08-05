import { createRouter } from './context';
import { z } from 'zod';

export const productsRouter = createRouter()
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
	})
	.query('filterBy', {
		input: z.object({
			limit: z.number(),
			countInStock: z
				.object({
					gt: z.number().min(1).optional(),
					lt: z.number().min(1).optional(),
				})
				.optional(),
			price: z
				.object({
					gt: z.number().min(1).optional(),
					lt: z.number().min(1).optional(),
				})
				.optional(),
			brandName: z.string().optional(),
			title: z.string().optional(),
			createdAt: z.date().optional(),
			categoriesName: z.array(z.string()).min(1).optional(),
		}),
		resolve: async ({ ctx, input }) => {
			console.log(input);
			return await ctx.prisma.product.findMany({
				include: {
					images: {
						select: {
							createdAt: true,
							image: true,
						},
					},
					brand: {
						select: {
							createdAt: true,
							brand: {
								include: {
									images: {
										select: {
											createdAt: true,
											image: true,
										},
									},
								},
							},
						},
					},
					categories: {
						select: {
							createdAt: true,
							category: {
								include: {
									images: {
										select: {
											createdAt: true,
											image: true,
										},
									},
								},
							},
						},
					},
				},
				where: {
					AND: {
						brand: input.brandName ? { brandName: input.brandName } : undefined,
						categories: input.categoriesName
							? { some: { categoryName: { in: input.categoriesName } } }
							: undefined,
						title: input.title ? { contains: input.title } : undefined,
						status: { equals: 'VISIBLE' },
						createdAt: input.createdAt ? input.createdAt : undefined,
						countInStock: {
							gt: input.countInStock?.gt ? input.countInStock?.gt : 0,
							lt: input.countInStock?.lt ? input.countInStock?.lt : undefined,
						},
						price: {
							gt: input.price?.gt ? input.price?.gt : undefined,
							lt: input.price?.lt ? input.price?.lt : undefined,
						},
					},
				},
				take: input.limit,
			});
		},
	});
