import { useSharedMainState } from '@components/layouts/Main/context';
import { trpc } from '@libs/trpc';
import { useSharedAdminDashboardProductsListState } from '@components/layouts/Admin/context/Products/List';
import { EAdminDashboardProductsListContextConsts } from '@components/layouts/Admin/context/Products/List/constants';
import { IAdminDashboardProduct } from '@components/layouts/Admin/context/Products/List/ts';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { buildButtonClassName } from '@utils/tailwind';

interface IProps {
	productData: Omit<IAdminDashboardProduct, 'status'> & {
		status: 'VISIBLE' | 'HIDDEN';
	};
	setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const DeleteProduct = ({ productData, setIsModalVisible }: IProps) => {
	const [{ currentBgColorMode, currentFontColorMode }] = useSharedMainState();
	const [, productsDispatch] = useSharedAdminDashboardProductsListState();
	const deleteProduct = trpc.useMutation('admin.products.deleteProduct');

	const isLoading = deleteProduct.isLoading && !deleteProduct.isSuccess;

	const buttonClassName = buildButtonClassName({ px: 'px-3', py: 'py-1' });

	useEffect(() => {
		if (
			deleteProduct.isSuccess &&
			deleteProduct.data &&
			deleteProduct?.data?.deletedId === productData.id &&
			!isLoading
		) {
			productsDispatch({
				type: EAdminDashboardProductsListContextConsts.DELETE,
				payload: {
					productId: productData.id,
				},
			});
			setIsModalVisible(true);
		}
	}, [
		deleteProduct.data,
		deleteProduct.data?.deletedId,
		deleteProduct.isSuccess,
		isLoading,
		productData.id,
		productsDispatch,
		setIsModalVisible,
	]);

	// className='px-3 py-1 m-1 rounded font-bold hover:filter hover:drop-shadow-sm hover:brightness-90'
	// style={{
	// 	backgroundColor: currentBgColorMode,
	// 	color: currentFontColorMode,
	// }}

	return (
		<div className='flex flex-col items-center justify-center gap-1'>
			<h2 className='text-3xl'>Are you sure you want to delete it?</h2>
			<div className='flex items-center justify-center'>
				<button
					className={buttonClassName} // 'duration-150 ease-in  bg-gray-900 hover:bg-zinc-100 hover:text-gray-900 dark:bg-gray-700 dark:hover:text-gray-700 px-4 py-2 rounded-md'
					style={{
						backgroundColor: currentBgColorMode,
						color: currentFontColorMode,
					}}
					disabled={isLoading}
					onClick={() => deleteProduct.mutate({ productId: productData.id })}
				>
					Yes
				</button>
				<span className='mx-1' />
				<button
					className={buttonClassName} // 'duration-150 ease-in  bg-gray-900 hover:bg-zinc-100 hover:text-gray-900 dark:bg-gray-700 dark:hover:text-gray-700 px-4 py-2 rounded-md'
					style={{
						backgroundColor: currentBgColorMode,
						color: currentFontColorMode,
					}}
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
