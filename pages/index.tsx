import type { GetStaticPropsContext, NextPage } from 'next';
import prisma from '@libs/prisma';
import { IAdminDashboardProduct } from 'contexts/AdminDashboard/Products/List/ts';
import HomePage from '@components/Home';

export interface IHomeProps {
	starredProductsInCollection1: IAdminDashboardProduct;
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
