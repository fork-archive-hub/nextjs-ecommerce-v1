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

			const brandUpserted = await ctx.prisma.brand.upsert({
				where: {
					name: input.brand,
				},
				create: {
					name: input.brand,
					// productId: productCreatedId,
				},
				update: { count: { increment: 1 } },
				select: {
					// id: true,
					createdAt: true,
					name: true,
				},
			});

			const brandOnProductCreated = await ctx.prisma.brandOnProducts.create({
				data: {
					brandName: brandUpserted.name,
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
				brand: brandUpserted,
			};
		},
	})
	.mutation('updateProduct', {
		input: z.object({
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
					removedNames: z.array(z.string()).optional(),
				})
				.optional(),
			brand: z
				.object({
					old: z.string().min(2),
					new: z.string().min(2),
				})
				.optional(),
		}),
		resolve: async ({ ctx, input }) => {
			let isProductUpdated = false;

			let basicData:
				| {
						status: string;
						title: string;
						price: number;
						description: string;
						countInStock: number;
						updatedAt: Date;
				  }
				| undefined = undefined;

			let categoriesUpserted:
				| {
						name: string;
						createdAt: Date;
						count: number;
				  }[]
				| undefined;

			let imagesCreated:
				| {
						id: string;
						src: string;
						alt: string | null;
				  }[]
				| undefined;

			let brandUpserted:
				| {
						createdAt: Date;
						name: string;
				  }
				| undefined;

			if (input?.images) {
				if (input.images.addedLinks) {
					const addedLinks = uniqueArrItems(input.images.addedLinks);

					if (addedLinks.length !== 0) {
						imagesCreated = await ctx.prisma.$transaction(
							input.images.addedLinks.map((src) =>
								ctx.prisma.image.create({
									data: { src },
									select: { id: true, src: true, alt: true },
								})
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

						if (!isProductUpdated) isProductUpdated = true;
					}
				}
				if (input.images.removedIds && input.images.removedIds?.length !== 0) {
					const imagesDeleted = await ctx.prisma.imagesOnProduct.deleteMany({
						where: {
							imageId: {
								in: input.images.removedIds,
							},
							AND: {
								productId: input.productId,
							},
						},
					});

					if (!isProductUpdated) isProductUpdated = true;
				}
			}

			if (input?.categories) {
				if (
					input.categories.addedNames &&
					input.categories.addedNames?.length !== 0
				) {
					const addedNames = uniqueArrItems(input.categories.addedNames);

					if (addedNames.length !== 0) {
						categoriesUpserted = await ctx.prisma.$transaction(
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
								data: categoriesUpserted.map((item) => ({
									productId: input.productId, // productCreatedId,
									categoryName: item.name,
								})),
							});

						if (!isProductUpdated) isProductUpdated = true;
					}
				}

				if (
					input.categories.removedNames &&
					input.categories.removedNames?.length !== 0
				) {
					const categoriesOnProductDeleted =
						await ctx.prisma.categoriesOnProducts.deleteMany({
							where: {
								categoryName: { in: input.categories.removedNames },
								AND: { productId: { equals: input.productId } },
							},
						});

					const categoriesDecremented = await ctx.prisma.category.updateMany({
						where: {
							name: { in: input.categories.removedNames },
						},
						data: { count: { decrement: 1 } },
					});

					if (!isProductUpdated) isProductUpdated = true;
				}
			}

			if (input.brand) {
				const brandUpdated = await ctx.prisma.brand.update({
					where: { name: input.brand.old },
					data: { count: { decrement: 1 } },
				});

				brandUpserted = await ctx.prisma.brand.upsert({
					where: {
						name: input.brand.new,
					},
					create: {
						name: input.brand.new,
						// productId: productCreatedId,
					},
					update: { count: { increment: 1 } },
					select: {
						// id: true,
						createdAt: true,
						name: true,
					},
				});
				const brandOnProductsUpdated = await ctx.prisma.brandOnProducts.update({
					data: { brandName: input.brand.new },
					where: {
						productId_brandName: {
							productId: input.productId,
							brandName: input.brand.old,
						},
					},
				});

				if (!isProductUpdated) isProductUpdated = true;
			}

			if (input?.basicData || isProductUpdated) {
				basicData = await ctx.prisma.product.update({
					data: {
						...(input.basicData || {}),
						updatedAt: new Date(),
					},
					where: {
						id: input.productId,
					},
					select: {
						title: true,
						price: true,
						description: true,
						status: true,
						countInStock: true,
						updatedAt: true,
					},
				});

				if (!isProductUpdated) isProductUpdated = true;
			}

			return {
				newData: {
					basicData,
					categoriesUpserted,
					imagesCreated,
					brandUpserted,
				},
				isProductUpdated,
			};
		},
	})
	.mutation('deleteProduct', {
		input: z.object({
			productId: z.string(),
		}),
		resolve: async ({ ctx, input }) => {
			/*
			Invalid `prisma.product.delete()` invocation:


  Foreign key constraint failed on the field: `ImagesOnProduct_productId_fkey (index)`
			*/
			const productBrandAndCategories =
				await ctx.prisma.product.findFirstOrThrow({
					select: {
						id: true,
						brand: {
							select: {
								brandName: true,
							},
						},
						categories: {
							select: {
								categoryName: true,
							},
						},
					},
					where: {
						id: input.productId,
					},
				});

			const productId = productBrandAndCategories.id;
			const brandName = productBrandAndCategories.brand?.brandName;
			const categories = productBrandAndCategories.categories.map(
				(item) => item.categoryName
			);
			if (brandName) {
				const brandUpdated = await ctx.prisma.brand.updateMany({
					where: { name: { in: brandName } },
					data: { count: { decrement: 1 } },
				});
			}
			if (categories.length !== 0) {
				const categoriesUpdated = await ctx.prisma.category.updateMany({
					where: { name: { in: categories } },
					data: { count: { decrement: 1 } },
				});
			}
			if (productId) {
				const productDeleted = await ctx.prisma.product.delete({
					where: { id: productId },
				});
			}

			return { deletedId: productId };
		},
	});
