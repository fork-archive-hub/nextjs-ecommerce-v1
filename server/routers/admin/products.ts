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

			const t = await ctx.prisma.imagesOnProduct.createMany({
				data: /*{
					productId: productCreatedId,
					imageId: imagesCreated[0].src,
				},
				*/ imagesCreated.map((item) => ({
					productId: productCreatedId,
					imageId: item.id,
				})),
			});

			// ctx.prisma.image.createMany({
			// 	data: input.images.map(item => ({
			// 		src: item
			// 	}))
			// })

			// console.log('productCreated');
			// console.dir(productCreated);
			/*
				productCreated
				{
					id: 'cl5pfqxp40000gcndfmtzso3f',
					title: 'Test',
					price: 10,
					image: 'https://pbs.twimg.com/profile_images/1498641868397191170/6qW2XkuI_400x400.png',
					brand: 'test',
					description: 'A product test 12345678910\n12345678910\n12345678910\n12345678910',
					status: 'VISIBLE',
					countInStock: 5,
					createdAt: 2022-07-17T14:51:03.054Z,
					updatedAt: 2022-07-17T14:51:03.072Z
				}
			*/

			return productCreated;
		},
	});
