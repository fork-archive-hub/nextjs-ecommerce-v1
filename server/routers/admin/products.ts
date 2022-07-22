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
					description: input.description,
					status: input.status,
					price: input.price,
					countInStock: input.countInStock,
				},
			});

			const productCreatedId = productCreated.id;

			const brandCreated = await ctx.prisma.productBrand.upsert({
				where: {
					name: input.brand,
				},
				create: {
					name: input.brand,
					productId: productCreatedId,
				},
				update: {},
				select: {
					id: true,
					createdAt: true,
					name: true,
				},
			});

			const imagesOnProduct = await ctx.prisma.imagesOnProduct.createMany({
				data: imagesCreated.map((item) => ({
					productId: productCreatedId,
					imageId: item.id,
				})),
			});

			console.log('categoriesCreated', categoriesCreated);
			console.log('productCreatedId', productCreatedId);

			const categoriesOnProduct =
				await ctx.prisma.categoriesOnProducts.createMany({
					data: categoriesCreated.map((item) => {
						console.log('item', item);

						return {
							productId: productCreatedId,
							categoryId: item.id,
						};
					}),
				});
			console.log('categoriesOnProduct', categoriesOnProduct);

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
	});
