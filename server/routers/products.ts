import { createRouter } from './context';
import { z } from 'zod';
import {
	productsBrandsAndCategoriesNames,
	productsFilteredByController,
} from '@utils/core/products/controllers';
import { productsFilteredByZodInputs } from '@utils/core/products/controllers/validate';

export const productsRouter = createRouter()
	.query('byId', {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ ctx, input }) {
			return await ctx.prisma.product.findFirstOrThrow({
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
					id: input.id,
				},
			});
		},
	})
	.query('filteredBy', {
		input: productsFilteredByZodInputs,
		resolve: async ({ ctx, input }) => {
			const data = await productsFilteredByController({
				prisma: ctx.prisma,
				input,
			});

			return data;
		},
	})
	.query('brandsAndCategoriesNames', {
		resolve: async ({ ctx }) => {
			return productsBrandsAndCategoriesNames({ prisma: ctx.prisma });
		},
	});
// .query('brandsNames', {
// 	resolve: async ({ ctx }) => {
// 		return await ctx.prisma.brand.findMany({
// 			select: { name: true },
// 		});
// 	},
// })
// .query('categoriesNames', {
// 	resolve: async ({ ctx }) => {
// 		return await ctx.prisma.category.findMany({
// 			select: { name: true },
// 		});
// 	},
// });
