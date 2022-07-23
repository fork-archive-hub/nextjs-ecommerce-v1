import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { useSharedAdminDashboardProductsListState } from 'contexts/AdminDashboard/Products/List';
import { useMemo } from 'react';
import Table from '.';
import { productTableDefaultColumns } from '../utils';

const ProductsAddedTable = () => {
	const [
		{
			added: { data: productsAddedListData },
		},
	] = useSharedAdminDashboardProductsListState();

	const data = useMemo(
		() => (productsAddedListData ? productsAddedListData : []),
		[productsAddedListData]
	);

	const type: ('UPDATE' | 'DELETE')[] = ['UPDATE', 'DELETE'];

	const table = useReactTable({
		columns: productTableDefaultColumns,
		data: data.map((item) => ({
			...item,
			mutate: {
				type,
				data: item,
			},
		})),
		getCoreRowModel: getCoreRowModel(),
	});

	if (productsAddedListData.length === 0) return <></>;

	return (
		<div className='max-w-full overflow-x-auto mb-12'>
			<header>
				<h2 className='text-4xl font-bold mb-2'>Added Products</h2>
			</header>
			<Table table={table} />
		</div>
	);
};

export default ProductsAddedTable;
