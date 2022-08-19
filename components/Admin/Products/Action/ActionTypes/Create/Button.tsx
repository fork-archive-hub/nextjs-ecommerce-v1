import DynamicModal from '@components/common/Modal/Dynamic';
import { useSharedMainState } from '@components/layouts/Main/context';
import { useState, Fragment } from 'react';
import CreateProduct from '.';

const CreateProductButton = ({
	buttonText = 'Create A new product?',
	CreateProductInitValues,
	originListType,
	removedProductOldId,
	closeModalOnSuccessfulSubmission,
}: {
	buttonText?: string;
	CreateProductInitValues?: Parameters<typeof CreateProduct>['0']['initValues'];
	originListType?: Parameters<typeof CreateProduct>['0']['originListType'];
	removedProductOldId?: string;
	closeModalOnSuccessfulSubmission?: boolean; //  | (() => void)
}) => {
	const [{ currentBgColorMode, currentFontColorMode }] = useSharedMainState();
	const [isCreateProductModalVisible, setIsCreateProductModalVisible] =
		useState(false);
	const handleCloseModalOnSuccessfulSubmission =
		closeModalOnSuccessfulSubmission
			? () => setIsCreateProductModalVisible((prev) => !prev)
			: undefined;

	return (
		<>
			<button
				className='text-xl px-4 py-2 my-1 font-bold hover:filter hover:brightness-95' // 'focus:bg-zinc-100 focus:text-black'
				style={{
					backgroundColor: currentBgColorMode,
					color: currentFontColorMode,
				}}
				onClick={() => setIsCreateProductModalVisible((prev) => !prev)}
			>
				{buttonText}
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
						originListType={originListType}
						removedProductOldId={removedProductOldId}
						initValues={
							CreateProductInitValues
							// {
							// 	title: '',
							// 	price: 0,
							// 	images: [],
							// 	categories: [],
							// 	brand: '',
							// 	description: '',
							// 	status: 'VISIBLE',
							// 	countInStock: 0,
							// }
						}
						handleCloseModalOnSuccessfulSubmission={
							handleCloseModalOnSuccessfulSubmission
						}
					/>
				</Fragment>
			</DynamicModal>
		</>
	);
};

export default CreateProductButton;
