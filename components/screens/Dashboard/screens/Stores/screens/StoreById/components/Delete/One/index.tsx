import { useSharedMainState } from '@components/layouts/Main/context';
import { trpc } from '@libs/trpc';
import { IAdminDashboardProduct } from '@components/layouts/Admin/context/Products/List/ts';
import { Dispatch, SetStateAction } from 'react';
import { buildButtonClassName } from '@utils/tailwind';

interface IProps {
	productData: Omit<IAdminDashboardProduct, 'status'> & {
		status: 'VISIBLE' | 'HIDDEN';
	};
	setIsModalVisible: Dispatch<SetStateAction<boolean>>;
	currentPageIndex: number;
}

const DeleteOneProduct = ({
	currentPageIndex,
	productData,
	setIsModalVisible,
}: IProps) => {
	const [{ currentBgColorMode, currentFontColorMode }] = useSharedMainState();
	const trpcContext = trpc.useContext();
	const deleteProduct = trpc.useMutation('stores.products.deleteOne', {
		onSuccess: (result) => {
			trpcContext.setInfiniteQueryData(
				['stores.products.getMany', { storeId: productData.storeId }],
				(prevDataNullable) => {
					const prevData = prevDataNullable || {
						pages: [],
						pageParams: [],
					};

					let targetedProduct:
						| typeof prevData['pages'][0]['data'][0]
						| undefined;
					const productCoordinates = {
						pageIndex: -1,
						dataIndex: -1,
					};

					const targetedPage = prevData.pages[currentPageIndex];

					if (!targetedPage) return prevData;

					const productId = productData.id;
					productCoordinates.pageIndex = currentPageIndex;

					// targetedProduct = targetedPage.data.find((item, itemIndex) => {
					// 	if (item.id === productId) {
					// 		productCoordinates.dataIndex = itemIndex;
					// 		return true;
					// 	}

					// 	return false;
					// });

					return {
						...prevData,
						pages: prevData.pages.map((page, pageIndex) => {
							if (pageIndex === productCoordinates.pageIndex) {
								return {
									...page,
									data: page.data.filter((item) => item.id !== productId),
								};
							}

							return page;
						}),
					};
				}
			);

			setIsModalVisible(false);
		},
	});

	const isLoading = deleteProduct.isLoading && !deleteProduct.isSuccess;

	const buttonClassName = buildButtonClassName({ px: 'px-3', py: 'py-1' });

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
					onClick={() =>
						deleteProduct.mutate({
							productId: productData.id,
							storeId: productData.storeId,
						})
					}
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

export default DeleteOneProduct;
