import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { useSharedAdminDashboardProductsListState } from 'contexts/AdminDashboard/Products/List';
import { useMemo } from 'react';
import Table from '.';
import { productTableDefaultColumns } from '../utils';

const ProductsRemovedTable = () => {
	const [
		{
			removed: { data: productsRemovedListData },
		},
	] = useSharedAdminDashboardProductsListState();

	const data = useMemo(
		() => (productsRemovedListData ? productsRemovedListData : []),
		[productsRemovedListData]
	);

	// const type: ('UPDATE' | 'DELETE')[] = ['UPDATE', 'DELETE'];

	const table = useReactTable({
		columns: productTableDefaultColumns,
		data: data.map((item) => ({
			...item,
			mutate: {
				type: {
					RETURN_REMOVED_PRODUCT: true,
				},
				data: item,
			},
		})),
		getCoreRowModel: getCoreRowModel(),
	});

	if (productsRemovedListData.length === 0) return <></>;

	return (
		<div className='max-w-full mb-12'>
			<header>
				<h2 className='text-4xl font-bold mb-2'>Removed Products</h2>
			</header>
			<div className="overflow-x-auto max-w-full">
				<Table table={table} />
			</div>
		</div>
	);
};

export default ProductsRemovedTable;
