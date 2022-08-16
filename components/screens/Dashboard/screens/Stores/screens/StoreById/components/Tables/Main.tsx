import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { InferQueryOutput } from '@utils/trpc/types';
// import { useSharedAdminDashboardProductsListState } from '@components/layouts/Admin/context/Products/List';
import { useMemo } from 'react';
import Table from '.';
import { productTableDefaultColumns } from '../utils';

const ProductsMainTable = ({
	productsListData,
	currentPageIndex,
	storeId,
}: {
	productsListData: InferQueryOutput<'stores.products.getMany'>;
	currentPageIndex: number;
	storeId: string;
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
			</div>
		</div>
	);
};

export default ProductsMainTable;
