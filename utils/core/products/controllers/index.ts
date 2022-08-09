import { productsFilteredByZodInputs } from './validate';
import prisma from '@libs/prisma';

type TPrisma = typeof prisma;

export const productsFilteredByController = async ({
	prisma,
	input,
}: {
	prisma: TPrisma;
	input: ReturnType<typeof productsFilteredByZodInputs['parse']>;
}) => {
	console.log('--------------------input', input);
	const limit = input.limit || 10;

	return await prisma.product.findMany({
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
				categories: input.categoriesNames
					? { some: { categoryName: { in: input.categoriesNames } } }
					: undefined,
				title: input.title
					? { contains: input.title, mode: 'insensitive' }
					: undefined,
				status: { equals: 'VISIBLE' },
				// createdAt: input.createdAt ? { gte: input.createdAt } : undefined,
				countInStock: {
					gte: input.countInStock?.gte ? input.countInStock?.gte : 0,
					lte: input.countInStock?.lte ? input.countInStock?.lte : undefined,
				},
				price: {
					gte: input.price?.gte ? input.price?.gte : undefined,
					lte: input.price?.lte ? input.price?.lte : undefined,
				},
			},
		},
		take: limit,
	});
};

export const productsBrandsAndCategoriesNames = async ({
	prisma,
}: {
	prisma: TPrisma;
}) => {
	return {
		brands: await prisma.brand.findMany({
			select: { name: true },
		}),
		categories: await prisma.category.findMany({
			select: { name: true },
		}),
	};
};
