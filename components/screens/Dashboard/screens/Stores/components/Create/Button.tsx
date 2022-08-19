import DynamicModal from '@components/common/Modal/Dynamic';
import { useSharedMainState } from '@components/layouts/Main/context';
import { useState, Fragment } from 'react';
import CreateStore from '.';

const CreateStoreButton = ({
	buttonText = 'Create A new store?',
	CreateStoreInitValues,
	originListType,
	removedStoreOldId,
	closeModalOnSuccessfulSubmission,
}: {
	buttonText?: string;
	CreateStoreInitValues?: Parameters<typeof CreateStore>['0']['initValues'];
	originListType?: Parameters<typeof CreateStore>['0']['originListType'];
	removedStoreOldId?: string;
	closeModalOnSuccessfulSubmission?: boolean; //  | (() => void)
}) => {
	const [{ currentBgColorMode, currentFontColorMode }] = useSharedMainState();
	const [isCreateStoreModalVisible, setIsCreateStoreModalVisible] =
		useState(false);
	const handleCloseModalOnSuccessfulSubmission =
		closeModalOnSuccessfulSubmission
			? () => setIsCreateStoreModalVisible((prev) => !prev)
			: undefined;

	return (
		<>
			<button
				className='text-xl px-4 py-2 my-1 font-bold hover:filter hover:brightness-95' // 'focus:bg-zinc-100 focus:text-black'
				style={{
					backgroundColor: currentBgColorMode,
					color: currentFontColorMode,
				}}
				onClick={() => setIsCreateStoreModalVisible((prev) => !prev)}
			>
				{buttonText}
			</button>
			<DynamicModal
				isVisible={isCreateStoreModalVisible}
				handleIsVisible={() => setIsCreateStoreModalVisible((prev) => !prev)}
				containerElem={{
					className: 'bg-gray-200 dark:bg-gray-800 p-4 max-w-lg m-auto',
					style: {
						width: '98%',
					},
				}}
			>
				<Fragment key='body'>
					<CreateStore
						originListType={originListType}
						removedStoreOldId={removedStoreOldId}
						initValues={
							CreateStoreInitValues
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

export default CreateStoreButton;
