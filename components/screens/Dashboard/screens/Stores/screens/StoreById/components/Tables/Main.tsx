import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { InferQueryOutput } from '@utils/trpc/types';
import Table from '.';
import { productTableDefaultColumns } from '../utils';

interface IPaginationFooterParams {
	pagesLength: number;
	currentPageIndex: number;
	setCurrentPageIndex: React.Dispatch<React.SetStateAction<number>>;
	isLastPageFetched: boolean;
	fetchNextPage: () => void;
	isFetchingNextPage: boolean;
}

const PaginationFooter = ({
	pagesLength,
	currentPageIndex,
	setCurrentPageIndex,
	isLastPageFetched,
	fetchNextPage,
	isFetchingNextPage,
}: IPaginationFooterParams) => {
	const disableNextButton =
		isFetchingNextPage ||
		(isLastPageFetched && currentPageIndex === pagesLength - 1);
	const disablePrevButton = isFetchingNextPage || currentPageIndex === 0;

	return (
		<div>
			<button
				disabled={disablePrevButton}
				onClick={() => {
					if (disablePrevButton) return;
					// Un flush Sync?
					setTimeout(() => setCurrentPageIndex((prev) => prev - 1), 0);
				}}
			>
				{'<<'}prev
			</button>
			<span className='px-2' />
			<span title={`Current page is ${currentPageIndex}`}>
				({currentPageIndex})
			</span>
			<span className='px-2' />
			<button
				disabled={disableNextButton}
				onClick={() => {
					if (disableNextButton) return;

					if (isLastPageFetched)
						return setTimeout(() => setCurrentPageIndex((prev) => prev + 1), 0);

					setCurrentPageIndex((prev) => prev + 1);
					fetchNextPage();
				}}
			>
				next{'>>'}
			</button>
		</div>
	);
};

const ProductsMainTable = ({
	productsListData,
	currentPageIndex,
	storeId,
	paginationFooterParams,
}: {
	productsListData: InferQueryOutput<'stores.products.getMany'>;
	currentPageIndex: number;
	storeId: string;
	paginationFooterParams?: IPaginationFooterParams;
}) => {
	// const [
	// 	{
	// 		mainList: { data: productsListData, page },
	// 	},
	// ] = useSharedAdminDashboardProductsListState();

	// const data = useMemo(
	// 	() => (productsListData[page.index] ? productsListData[page.index] : []),
	// 	[page.index, productsListData]
	// );

	const table = useReactTable({
		columns: productTableDefaultColumns,
		data: productsListData.data.map((item) => ({
			...item,
			mutate: {
				storeId,
				currentPageIndex,
				type: {
					UPDATE: true,
					DELETE: true,
				},
				data: item,
			},
		})),
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className='max-w-full'>
			<div className='overflow-x-auto max-w-full'>
				<Table table={table} />
				{paginationFooterParams &&
					typeof paginationFooterParams === 'object' && (
						<PaginationFooter {...paginationFooterParams} />
					)}
			</div>
		</div>
	);
};

export default ProductsMainTable;
