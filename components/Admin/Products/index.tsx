import { trpc } from '@libs/trpc';
import { useEffect, useState } from 'react';
import { useSharedAdminDashboardProductsListState } from 'contexts/AdminDashboard/Products/List';
import { EAdminDashboardProductsListContextConsts } from 'contexts/AdminDashboard/Products/List/constants';

import ProductsAddedTable from './Tables/Added';
import ProductsMainTable from './Tables/Main';
import ProductsRemovedTable from './Tables/Removed';
import CreateProductButton from './Action/ActionTypes/Create/Button';

const AdminProducts = () => {
	const [
		{
			mainList: { data: productsListData, orderBy, page, filterBy },
		},
		productsDispatch,
	] = useSharedAdminDashboardProductsListState();
	const [isEnabled, setIsEnabled] = useState(true);
	const productsFetch = trpc.useQuery(
		[
			'admin.products.all',
			{
				limit: page.limit,
			},
		],
		{
			initialData: [],
			enabled: isEnabled,
		}
	);

	useEffect(() => {
		if (isEnabled && productsFetch.isSuccess && productsFetch.isFetched) {
			productsDispatch({
				type: EAdminDashboardProductsListContextConsts.ADD,
				payload: {
					type: 'MANY',
					products: productsFetch.data,
				},
			});
			setIsEnabled(false);
		}
	}, [
		isEnabled,
		productsDispatch,
		productsFetch.data,
		productsFetch.isFetched,
		productsFetch.isSuccess,
	]);

	return (
		<div className='p-4 overflow-auto'>
			{/* w-full h-full */}
			<header>
				<h1>Products Page</h1>
			</header>
			<div>
				<CreateProductButton />
				<ProductsAddedTable />
				<ProductsRemovedTable />
				<ProductsMainTable />
			</div>
		</div>
	);
};

export default AdminProducts;
