import { createRouter } from '../context';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
// import { authOptions } from '@pages/api/auth/[...nextauth]';
// import { unstable_getServerSession } from 'next-auth';

export const adminProductsRouter = createRouter()
	.middleware(async ({ ctx, next }) => {
		if (!ctx.session?.user?.role || ctx.session.user.role !== 'ADMIN')
			throw new TRPCError({ code: 'UNAUTHORIZED' });

		return next();
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
				input.images.map((item) =>
					ctx.prisma.image.create({ data: { src: item } })
				)
			);

			const categoriesCreated = await ctx.prisma.$transaction(
				input.categories.map((item) =>
					ctx.prisma.category.upsert({
						where: {
							name: item, // input.categories[0],
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
					// images: {
					// 	createMany: {
					// 		data: imagesCreated.map((item) => ({ imageId: item.src })),
					// 	},
					// },
					brand: input.brand,
					description: input.description,
					status: input.status,
					price: input.price,
					countInStock: input.countInStock,
				},
			});

			const productCreatedId = productCreated.id;

			const imagesOnProduct = await ctx.prisma.imagesOnProduct.createMany({
				data: imagesCreated.map((item) => ({
					productId: productCreatedId,
					imageId: item.id,
				})),
			});

			const categoriesOnProduct =
				await ctx.prisma.categoriesOnProducts.createMany({
					data: categoriesCreated.map((item) => ({
						productId: productCreatedId,
						categoryId: item.id,
					})),
				});


			return {
				...productCreated,
				images: imagesCreated.map((image) => ({
					image,
				})),
				categories: categoriesCreated.map((category) => ({
					category,
				})),
			};
		},
	});
