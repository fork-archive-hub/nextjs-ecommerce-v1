import { trpc } from '@libs/trpc';
import type { TStoreByIdPageProps } from '@pages/dashboard/stores/[storeId]';
import React, { useEffect, useRef, useState } from 'react';
import CreateProductButton from './components/Create/One/Button';
import ProductsMainTable from './components/Tables/Main';

const StoreByIdScreen = (props: TStoreByIdPageProps) => {
	const storeId = props.storeId;

	// IMPORTANT!!!
	// In `store` we needs to increment when creating and decrement when deleting a product
	const [store, useStore] = useState(props.store);
	const [currentPageIndex, setCurrentPageIndex] = useState(0);
	const [isStoresProductsGetManyEnabled, setIsStoresProductsGetManyEnabled] =
		useState(store.productsCounter !== 0);
	const [isLastPageFetched, setIsLastPageFetched] = useState(false);

	const storesProductsGetMany = trpc.useInfiniteQuery(
		['stores.products.getMany', { storeId: storeId }],
		{
			getNextPageParam: (productsDetails) =>
				productsDetails
					? new Date(productsDetails.cursor.lastItemCreatedAt)
					: undefined,

			// enabled: isStoresProductsGetManyEnabled,
			onSuccess: (data) => {
				const lastPage = data.pages[data.pages.length - 1];

				if (lastPage.isLastPage) {
					setIsStoresProductsGetManyEnabled(true);
					setIsLastPageFetched(true);
				}
			},
			refetchOnMount: false,
			// refetchOnReconnect: false
			refetchOnWindowFocus: false,
		}
	);
	// initialData: {
	// 	pages: [],
	// 	pageParams: [],
	// },
	// keepPreviousData: true,
	// staleTime: Infinity,

	useEffect(() => {
		if (isStoresProductsGetManyEnabled && storesProductsGetMany.isSuccess) {
			setIsStoresProductsGetManyEnabled(false);
		}
	}, [isStoresProductsGetManyEnabled, storesProductsGetMany.isSuccess]);

	return (
		<main className='p-8 h-full-content-page overflow-auto'>
			<header></header>
			<section>
				<div>
					<CreateProductButton
						currentPageIndex={currentPageIndex}
						storeId={storeId}
					/>
				</div>
				{Array.isArray(storesProductsGetMany?.data?.pages) &&
					storesProductsGetMany?.data?.pages[currentPageIndex] && (
						<ProductsMainTable
							currentPageIndex={currentPageIndex}
							storeId={storeId}
							productsListData={
								storesProductsGetMany?.data?.pages[currentPageIndex]
							}
							paginationFooterParams={{
								pagesLength: storesProductsGetMany.data.pages.length,
								currentPageIndex,
								setCurrentPageIndex,
								isLastPageFetched,
								fetchNextPage: () => {
									storesProductsGetMany.fetchNextPage();
								},
								isFetchingNextPage: storesProductsGetMany.isFetchingNextPage,
							}}
						/>
					)}
			</section>
		</main>
	);
};

export default StoreByIdScreen;
