import type { GetStaticPropsContext, NextPage } from 'next';
import prisma from '@libs/prisma';
import { IAdminDashboardProducts } from '@components/layouts/Admin/context/Products/List/ts';
import HomePage from '@components/Home';

export interface IHomeProps {
	starredProductsInCollection1: IAdminDashboardProducts;
}

const Home: NextPage<IHomeProps> = ({ starredProductsInCollection1 }) => {
	return (
		<HomePage starredProductsInCollection1={starredProductsInCollection1} />
	);
};

export async function getStaticProps(
	context: GetStaticPropsContext<{ id: string }>
) {
	// const ssg = await createSSGHelpers({
	// 	router: appRouter,
	// 	ctx: await createContext(),
	// 	transformer: superjson, // optional - adds superjson serialization
	// });
	// // const id = context.params?.id as string;

	// // prefetch `pagesBuild.getStarredProductsInCollection1`
	// await ssg.fetchQuery('pagesBuild.getStarredProductsInCollection1', {
	// 	PAGES_BUILD_SECRET_TOKEN: process.env.PAGES_BUILD_SECRET_TOKEN,
	// });
	// // ssg.queryClient.prisma()

	const data = await prisma.product.findMany({
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
			categories: {
				some: {
					categoryName: { equals: 'starred_collection_1' },
				},
			},
		},
	});

	return {
		props: {
			// trpcState: ssg.dehydrate(),
			// id,
			starredProductsInCollection1: data,
		},
		revalidate: 60,
	};
}

export default Home;
