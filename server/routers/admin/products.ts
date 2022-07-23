import { createRouter } from '../context';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
// import { authOptions } from '@pages/api/auth/[...nextauth]';
// import { unstable_getServerSession } from 'next-auth';

const uniqueArrItems = (items: string[]) => {
	const arr: string[] = [];
	const itemsObj: {
		[key in string]: boolean;
	} = {};

	let i = 0;
	for (; i < items.length; i++) {
		if (!itemsObj[items[i]]) {
			arr.push(items[i]);
			itemsObj[items[i]] = true;
		}
	}

	return arr;
};

export const adminProductsRouter = createRouter()
	.middleware(async ({ ctx, next }) => {
		if (!ctx.session?.user?.role || ctx.session.user.role !== 'ADMIN')
			throw new TRPCError({ code: 'UNAUTHORIZED' });

		return next();
	})
	.query('all', {
		input: z.object({
			limit: z.number(),
			lastItemCreatedAt: z.string().optional(),
		}),
		async resolve({ ctx, input }) {
			const data = await ctx.prisma.product.findMany({
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
							brand: {
								select: {
									name: true,
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
					description: true,
					status: true,
					countInStock: true,
					createdAt: true,
					updatedAt: true,
				},
				take: input.limit,
			});

			return data;
		},
	})
	.mutation('createProduct', {
		// validate input with Zod
		input: z.object({
			title: z.string().min(2),
			images: z.array(z.string()), // .isURL,
			categories: z.array(z.string()), // .isURL,
			brand: z.string().min(2),
			description: z.string().min(25),
			status: z
				.string()
				.refine((data) => data === 'VISIBLE' || data === 'HIDDEN'),
			price: z.number().refine((data) => data >= 0),
			countInStock: z.number().refine((data) => data >= 0),
		}),
		async resolve({ ctx, input }) {
			// const imagesCreated = await ctx.prisma.image.createMany({
			// 	data: input.images.map(item => ({
			// 		src: item
			// 	}))
			// });
			const imagesCreated = await ctx.prisma.$transaction(
				uniqueArrItems(input.images).map((item) =>
					ctx.prisma.image.create({ data: { src: item } })
				)
			);

			const categoriesCreated = await ctx.prisma.$transaction(
				uniqueArrItems(input.categories).map((item) =>
					ctx.prisma.category.upsert({
						where: {
							// name: item, // input.categories[0],
							name: item,
						},
						create: {
							name: item, // input.categories[0],
						},
						update: {
							count: { increment: 1 },
						},
					})
				)
			);

			const productCreated = await ctx.prisma.product.create({
				data: {
					title: input.title,
					description: input.description,
					status: input.status,
					price: input.price,
					countInStock: input.countInStock,
				},
			});

			const productCreatedId = productCreated.id;

			const brandCreated = await ctx.prisma.brand.upsert({
				where: {
					name: input.brand,
				},
				create: {
					name: input.brand,
					// productId: productCreatedId,
				},
				update: {},
				select: {
					// id: true,
					createdAt: true,
					name: true,
				},
			});

			const brandOnProductCreated = await ctx.prisma.brandOnProducts.create({
				data: {
					brandName: brandCreated.name,
					productId: productCreatedId,
				},
			});

			const imagesOnProduct = await ctx.prisma.imagesOnProduct.createMany({
				data: imagesCreated.map((item) => ({
					productId: productCreatedId,
					imageId: item.id,
				})),
			});

			const categoriesOnProduct =
				await ctx.prisma.categoriesOnProducts.createMany({
					data: categoriesCreated.map((item) => {
						return {
							productId: productCreatedId,
							categoryName: item.name,
						};
					}),
				});

			return {
				...productCreated,
				images: imagesCreated.map((image) => ({
					image,
				})),
				categories: categoriesCreated.map((category) => ({
					category,
				})),
				brand: brandCreated,
			};
		},
	})
	.mutation('updateProduct', {
		input: z
			.object({
				productId: z.string(),
				basicData: z
					.object({
						title: z.string().min(2).optional(),
						description: z.string().min(25).optional(),
						status: z
							.string()
							.refine((data) => data === 'VISIBLE' || data === 'HIDDEN')
							.optional(),
						price: z
							.number()
							.refine((data) => data >= 0)
							.optional(),
						countInStock: z
							.number()
							.refine((data) => data >= 0)
							.optional(),
					})
					.optional(),
				// categories: z.array(z.string()), // .isURL,
				// brand: z.string().min(2),
				images: z
					.object({
						addedLinks: z.array(z.string()).optional(),
						removedIds: z.array(z.string()).optional(),
					})
					.optional(),
				categories: z
					.object({
						addedNames: z.array(z.string()).optional(),
						removedIds: z.array(z.string()).optional(),
					})
					.optional(),
				brand: z.string().min(2),
			})
			.optional(),
		resolve: async ({ ctx, input }) => {
			if (input?.basicData) {
				const basicData = await ctx.prisma.product.update({
					data: {
						...input.basicData,
					},
					where: {
						id: input.productId,
					},
				});

				console.log('basicData', basicData);
			}

			if (input?.images) {
				if (input.images.addedLinks) {
					const addedLinks = uniqueArrItems(input.images.addedLinks);

					if (addedLinks.length !== 0) {
						const imagesCreated = await ctx.prisma.$transaction(
							input.images.addedLinks.map((src) =>
								ctx.prisma.image.create({ data: { src } })
							)
						);

						const imagesOnProduct = await ctx.prisma.imagesOnProduct.createMany(
							{
								data: imagesCreated.map((item) => ({
									productId: input.productId, // productCreatedId,
									imageId: item.id,
								})),
							}
						);

						console.log('imagesCreated', imagesCreated);
						console.log('imagesOnProduct', imagesOnProduct);
					}
				}
				if (input.images.removedIds && input.images.removedIds?.length !== 0) {
					const imagesDeleted = await ctx.prisma.image.deleteMany({
						where: {
							id: {
								in: input.images.removedIds,
							},
						},
					});

					console.log('imagesDeleted', imagesDeleted);
				}
			}

			if (input?.categories) {
				if (
					input.categories.addedNames &&
					input.categories.addedNames?.length !== 0
				) {
					const addedNames = uniqueArrItems(input.categories.addedNames);

					if (addedNames.length !== 0) {
						const categoriesCreated = await ctx.prisma.$transaction(
							input.categories.addedNames.map((name) =>
								ctx.prisma.category.upsert({
									create: { name },
									where: { name },
									update: {
										count: { increment: 1 },
									},
								})
							)
						);

						const categoriesOnProduct =
							await ctx.prisma.categoriesOnProducts.createMany({
								data: categoriesCreated.map((item) => ({
									productId: input.productId, // productCreatedId,
									categoryName: item.name,
								})),
							});

						console.log('categoriesCreated', categoriesCreated);
						console.log('categoriesOnProduct', categoriesOnProduct);
					}
				}

				if (
					input.categories.removedIds &&
					input.categories.removedIds?.length !== 0
				) {
					const categoriesDeleted = await ctx.prisma.image.deleteMany({
						where: {
							id: {
								in: input.categories.removedIds,
							},
						},
					});

					console.log('categoriesDeleted', categoriesDeleted);
				}

				if (input.brand) {
					const brandUpdated = await ctx.prisma.brandOnProducts.update({
						data: {
							brandName: input.brand,
						},
						where: {
							productId: input.productId,
						},
					});

					console.log('brandUpdated', brandUpdated);
				}
			}
		},
	});
