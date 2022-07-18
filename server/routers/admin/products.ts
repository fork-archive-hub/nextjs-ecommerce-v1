import { createRouter } from '../context';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
// import { authOptions } from '@pages/api/auth/[...nextauth]';
// import { unstable_getServerSession } from 'next-auth';

export const adminProductsRouter = createRouter()
	.middleware(async ({ ctx, next }) => {
		/*
  const session = await unstable_getServerSession(req, res, authOptions)
  if (session) {
    // Signed in
    console.log("Session", JSON.stringify(session, null, 2))
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
		*/
		if (!ctx.session?.user?.role || ctx.session.user.role !== 'ADMIN')
			throw new TRPCError({ code: 'UNAUTHORIZED' });

		return next();
	})
	.mutation('createProduct', {
		// validate input with Zod
		input: z.object({
			title: z.string().min(2),
			image: z.string(), // .isURL,
			brand: z.string().min(2),
			description: z.string().min(25),
			status: z
				.string()
				.refine((data) => data === 'VISIBLE' || data === 'HIDDEN'),
			price: z.number().refine((data) => data >= 0),
			countInStock: z.number().refine((data) => data >= 0),
		}),
		async resolve({ ctx, input }) {
			// use your ORM of choice
			const productCreated = await ctx.prisma.product.create({
				data: {
					title: input.title,
					image: input.image,
					brand: input.brand,
					description: input.description,
					status: input.status,
					price: input.price,
					countInStock: input.countInStock,
				},
			});

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
