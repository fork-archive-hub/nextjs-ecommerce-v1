import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { useSharedAdminDashboardProductsListState } from 'contexts/AdminDashboard/Products/List';
import { useMemo } from 'react';
import Table from '.';
import { productTableDefaultColumns } from '../utils';

const ProductsMainTable = () => {
	const [
		{
			mainList: { data: productsListData, page },
		},
	] = useSharedAdminDashboardProductsListState();

	const data = useMemo(
		() => (productsListData[page.index] ? productsListData[page.index] : []),
		[page.index, productsListData]
	);

	const table = useReactTable({
		columns: productTableDefaultColumns,
		data: data.map((item) => ({
			...item,
			mutate: {
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
			<div className="overflow-x-auto max-w-full">
				<Table table={table} />
			</div>
		</div>
	);
};

export default ProductsMainTable;
