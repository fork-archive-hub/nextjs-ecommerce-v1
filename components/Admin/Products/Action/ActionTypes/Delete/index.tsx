import { trpc } from '@libs/trpc';
import { useSharedAdminDashboardState } from 'contexts/AdminDashboard';
import { useSharedAdminDashboardProductsListState } from 'contexts/AdminDashboard/Products/List';
import { EAdminDashboardProductsListContextConsts } from 'contexts/AdminDashboard/Products/List/constants';
import { IAdminDashboardProduct } from 'contexts/AdminDashboard/Products/List/ts';
import { CSSProperties, Dispatch, SetStateAction, useEffect } from 'react';

interface IProps {
	productData: Omit<IAdminDashboardProduct, 'status'> & {
		status: 'VISIBLE' | 'HIDDEN';
	};
	setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const DeleteProduct = ({ productData, setIsModalVisible }: IProps) => {
	const [{ currentColorMode }] = useSharedAdminDashboardState();
	const [, productsDispatch] = useSharedAdminDashboardProductsListState();
	const deleteProduct = trpc.useMutation('admin.products.deleteProduct');

	const isLoading = deleteProduct.isLoading && !deleteProduct.isSuccess;

	useEffect(() => {
		if (deleteProduct.isSuccess && !isLoading) {
			productsDispatch({
				type: EAdminDashboardProductsListContextConsts.DELETE,
				payload: {
					productId: productData.id,
				},
			});
		}
	}, [deleteProduct.isSuccess, isLoading, productData.id, productsDispatch]);

	return (
		<div className='flex flex-col items-center justify-center gap-1'>
			<h2 className='text-3xl'>Are you sure you want to delete it?</h2>
			<div className='flex items-center justify-center'>
				<button
					className='px-3 py-1 m-1 rounded font-bold hover:filter hover:drop-shadow-sm hover:brightness-90'
					style={{ backgroundColor: currentColorMode}}
					disabled={isLoading}
					onClick={() => deleteProduct.mutate({ productId: productData.id })}
				>
					Yes
				</button>
				<span className='mx-1' />
				<button
					className='px-3 py-1 m-1 rounded font-bold hover:filter hover:drop-shadow-sm hover:brightness-90'
					style={{ backgroundColor: currentColorMode}}
					disabled={isLoading}
					onClick={() => setIsModalVisible((prev) => !prev)}
				>
					No
				</button>
			</div>
		</div>
	);
};

export default DeleteProduct;
