import CreateProductButton from '@components/Admin/Products/Action/ActionTypes/Create/Button';
import { trpc } from '@libs/trpc';
import { InferQueryOutput } from '@utils/trpc/types';
import {
	GetServerSideProps,
	GetStaticPaths,
	GetStaticProps,
	GetStaticPropsContext,
	InferGetServerSidePropsType,
	InferGetStaticPropsType,
	NextPage,
} from 'next';
import { useState, useRef } from 'react';

import { createSSGHelpers } from '@trpc/react/ssg';
import { appRouter } from '@server/routers';
import { createContext } from '@server/routers/context';
import superjson from 'superjson';
import prisma from '@libs/prisma';
import DashboardLayoutWithContext from '@components/layouts/Dashboard';
import StoreByIdScreen from '@components/screens/Dashboard/screens/Stores/screens/StoreById';

// const {
//   prefetchQuery,
//   prefetchInfiniteQuery,
//   fetchQuery,
//   fetchInfiniteQuery,
//   dehydrate,
//   queryClient,
// } = await createSSGHelpers({
//   router: appRouter,
//   ctx: createContext,
//   transformer: superjson, // optional - adds superjson serialization
// });

interface Props {}

const StoreShowCase = ({
	store,
}: {
	store: InferQueryOutput<'stores.getStores'>[0];
}) => {
	const [isSectionVisible, setIsSectionVisible] = useState<
		'FIRST_TIME' | boolean
	>('FIRST_TIME');
	const [isStoresProductsGetManyEnabled, setIsStoresProductsGetManyEnabled] =
		useState(store.productsCounter !== 0);
	const configRef = useRef({
		isLastPage: false,
	});
	const storesProductsGetMany = trpc.useInfiniteQuery(
		[
			'stores.products.getMany',
			{
				storeId: store.id,
			},
		],
		{
			initialData: {
				pages: [],
				pageParams: [],
			},
			getNextPageParam: (productsDetails) =>
				productsDetails?.cursor?.lastItemCreatedAt
					? new Date(productsDetails.cursor.lastItemCreatedAt)
					: undefined,

			enabled:
				isStoresProductsGetManyEnabled && isSectionVisible !== 'FIRST_TIME',
			onSuccess: (data) => {
				const lastPage = data.pages[data.pages.length - 1];

				if (lastPage.isLastPage) configRef.current.isLastPage = true;
			},
			// keepPreviousData: true,
			// staleTime: Infinity,
		}
	);
	const [currentPageIndex, setCurrentPageIndex] = useState(0);

	return (
		<div key={store.id} className='p-4'>
			<header className='flex w-full items-center justify-between'>
				<h3>{store.title}</h3>
				<button
					onClick={() =>
						setIsSectionVisible((prev) =>
							prev === 'FIRST_TIME' ? true : !prev
						)
					}
				>
					x
				</button>
			</header>
			{((typeof isSectionVisible === 'string' &&
				isSectionVisible !== 'FIRST_TIME') ||
				(typeof isSectionVisible === 'boolean' && isSectionVisible)) && (
				<div>
					<div className=''>
						<p>
							{store.description} /{' '}
							{typeof store.productsCounter === 'number' &&
								`${store.productsCounter}`}
						</p>
					</div>
					<div className=''>
						<CreateProductButton />
						<button
							onClick={() =>
								!configRef.current.isLastPage &&
								storesProductsGetMany.fetchNextPage({
									// cancelRefetch: true,
								})
							}
						>
							Test
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export type TStoreByIdPageProps = InferGetStaticPropsType<
	typeof getStaticProps
>;

const StoreByIdPage: NextPage<TStoreByIdPageProps> = (props) => {
	return (
		<DashboardLayoutWithContext>
			<StoreByIdScreen {...props} />
		</DashboardLayoutWithContext>
	);
};

export default StoreByIdPage;

// GetStaticProps

export const getStaticProps = async (
	context: GetStaticPropsContext<{ storeId: string }>
) => {
	const ssg = createSSGHelpers({
		router: appRouter,
		ctx: await createContext(),
		transformer: superjson,
	});
	const storeId = context.params?.storeId as string;

	const store = await prisma.store.findFirstOrThrow({
		include: { address: true },
		where: {
			id: storeId,
		},
	});

	/*
	 * Prefetching the `post.byId` query here.
	 * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
	 */
	await ssg.prefetchInfiniteQuery(
		// 	'stores.products.getMany', {
		// 	storeId,
		// }
		'stores.products.getMany',
		{
			storeId: storeId,
		}
	);

	// Make sure to return { props: { trpcState: ssg.dehydrate() } }
	return {
		props: {
			trpcState: ssg.dehydrate(),
			storeId,
			store,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await prisma.store.findMany({
		select: {
			id: true,
		},
	});
	return {
		paths: posts.map((post) => ({
			params: {
				storeId: post.id,
			},
		})),
		// https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
		fallback: 'blocking',
	};
};
