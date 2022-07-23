import { trpc } from '@libs/trpc';
import { Fragment, useEffect, useState } from 'react';
import DynamicModal from '@components/common/Modal/Dynamic';
import { useSharedAdminDashboardProductsListState } from 'contexts/AdminDashboard/Products/List';
import { EAdminDashboardProductsListContextConsts } from 'contexts/AdminDashboard/Products/List/constants';

import CreateProduct from './Action/ActionTypes/Create';
import ProductsAddedTable from './Tables/Added';
import ProductsMainTable from './Tables/Main';
import ProductsRemovedTable from './Tables/Removed';

const CreateProductButton = () => {
	const [isCreateProductModalVisible, setIsCreateProductModalVisible] =
		useState(false);

	return (
		<>
			<button onClick={() => setIsCreateProductModalVisible((prev) => !prev)}>
				Create A new product?
			</button>
			<DynamicModal
				isVisible={isCreateProductModalVisible}
				handleIsVisible={() => setIsCreateProductModalVisible((prev) => !prev)}
				containerElem={{
					className: 'bg-gray-200 dark:bg-gray-800 p-4 max-w-lg m-auto',
					style: {
						width: '98%',
					},
				}}
			>
				<Fragment key='body'>
					<CreateProduct
						initValues={{
							title: '',
							price: 0,
							images: [],
							categories: [],
							brand: '',
							description: '',
							status: 'VISIBLE',
							countInStock: 0,
						}}
					/>
				</Fragment>
			</DynamicModal>
		</>
	);
};

const AdminProducts = () => {
	const [
		{
			list: { data: productsListData, orderBy, page, filterBy },
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
		<div className='p-4 w-full h-full overflow-x-auto'>
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
