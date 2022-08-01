import CustomNextImage from '@components/common/CustomNextImage';
import DynamicModal from '@components/common/Modal/Dynamic';
import { useSharedMainState } from '@components/layouts/Main/context';
import { createColumnHelper } from '@tanstack/react-table';
import { useSharedAdminDashboardState } from 'contexts/AdminDashboard';
import { IAdminDashboardProduct } from 'contexts/AdminDashboard/Products/List/ts';
import { useState, Fragment } from 'react';
import {
	checkProductObjStatusOrThrow,
	checkProductStatusOrThrow,
} from 'utils/core/product';
import { buildButtonClassName } from 'utils/tailwind';
import CreateProductButton from '../Action/ActionTypes/Create/Button';
import DeleteProduct from '../Action/ActionTypes/Delete';
import UpdateProduct from '../Action/ActionTypes/Update';

export type TCreateColumnHelper = IAdminDashboardProduct & {
	mutate: {
		data: IAdminDashboardProduct;
		type?: {
			UPDATE?: boolean;
			DELETE?: boolean;
			RETURN_REMOVED_PRODUCT?: boolean;
		};
	};
};

const columnHelper = createColumnHelper<TCreateColumnHelper>();
export const productTableDefaultColumns = [
	columnHelper.accessor('status', {
		cell: (info) => <p>{info.renderValue()}</p>,
	}),
	columnHelper.accessor('images', {
		cell: (info) => {
			const data = info.renderValue<IAdminDashboardProduct['images']>();

			if (!data) return <></>;

			return (
				<div className='grid grid-cols-3 w-96 justify-center items-center gap-1'>
					{data.map((item) => (
						<CustomNextImage
							src={item.image.src}
							alt={item.image.alt || ''}
							key={item.image.id}
							className='w-full h-full object-contain'
							width={150}
							height={150}
						/>
					))}
				</div>
			);
		},
	}),
	columnHelper.accessor('title', {
		cell: (info) => <p>{info.renderValue()}</p>,
	}),
	columnHelper.accessor('price', {
		cell: (info) => <p>{info.renderValue()}</p>,
	}),
	columnHelper.accessor('countInStock', {
		cell: (info) => <p>{info.renderValue()}</p>,
	}),
	columnHelper.accessor('description', {
		cell: (info) => <p>{info.renderValue()}</p>,
	}),
	columnHelper.accessor('brand', {
		cell: (info) => {
			const data = info.renderValue();

			if (!data) return;
			return <p>{data.brand.name}</p>;
		},
	}),
	columnHelper.accessor('categories', {
		cell: (info) => {
			const t = info.renderValue();

			return info
				.renderValue<IAdminDashboardProduct['categories']>()
				.map((item) => <p key={item.category.name}>{item.category.name}</p>);
		},
	}),
	columnHelper.accessor('createdAt', {
		cell: (info) => (
			<p>
				{info.renderValue() &&
					new Date(info.renderValue() || 0).toLocaleString()}
			</p>
		),
	}),
	columnHelper.accessor('updatedAt', {
		cell: (info) => (
			<p>
				{info.renderValue() &&
					new Date(info.renderValue() || 0).toLocaleString()}
			</p>
		),
	}),
	columnHelper.accessor('mutate', {
		cell: (info) => {
			const data = info.renderValue();

			if (!data?.type) return <></>;

			return (
				<>
					{data.type?.UPDATE && (
						<>
							<UpdateProductButton
								productData={checkProductObjStatusOrThrow(data.data)}
							/>
						</>
					)}
					{data.type?.DELETE && (
						<DeleteProductButton
							productData={checkProductObjStatusOrThrow(data.data)}
						/>
					)}
					{data.type?.RETURN_REMOVED_PRODUCT && (
						<CreateProductButton
							buttonText='Return?'
							CreateProductInitValues={{
								title: data.data.title,
								price: data.data.price,
								images: data.data.images.map((item) => item.image.src),
								brand: data.data.brand?.brand.name || '',
								description: data.data.description,
								categories: data.data.categories.map(
									(item) => item.category.name
								),
								status: checkProductStatusOrThrow(data.data.status),
								countInStock: data.data.countInStock,
							}}
							originListType='REMOVED'
							removedProductOldId={data.data.id}
							closeModalOnSuccessfulSubmission
						/>
					)}
				</>
			);
		},
	}),
];

const UpdateProductButton = ({
	productData,
}: {
	productData: Omit<IAdminDashboardProduct, 'status'> & {
		status: 'VISIBLE' | 'HIDDEN';
	};
}) => {
	const [{ currentBgColorMode, currentFontColorMode }] = useSharedMainState();
	const [isModalVisible, setIsModalVisible] = useState(false);

	return (
		<>
			<button
				className={buildButtonClassName({ px: 'px-2', py: 'py-1' })}
				style={{
					backgroundColor: currentBgColorMode,
					color: currentFontColorMode,
				}}
				onClick={() => setIsModalVisible((prev) => !prev)}
			>
				Update
			</button>
			<DynamicModal
				isVisible={isModalVisible}
				handleIsVisible={() => setIsModalVisible((prev) => !prev)}
				containerElem={{
					className: 'bg-gray-200 dark:bg-gray-800 p-4 max-w-lg m-auto',
					style: {
						width: '98%',
					},
				}}
			>
				<Fragment key='body'>
					<UpdateProduct productData={productData} />
				</Fragment>
			</DynamicModal>
		</>
	);
};

const DeleteProductButton = ({
	productData,
}: {
	productData: Omit<IAdminDashboardProduct, 'status'> & {
		status: 'VISIBLE' | 'HIDDEN';
	};
}) => {
	const [{ currentBgColorMode, currentFontColorMode }] = useSharedMainState();
	const [isModalVisible, setIsModalVisible] = useState(false);

	return (
		<>
			<button
				className={buildButtonClassName({ px: 'px-2', py: 'py-1' })}
				style={{
					backgroundColor: currentBgColorMode,
					color: currentFontColorMode,
				}}
				onClick={() => setIsModalVisible((prev) => !prev)}
			>
				Delete
			</button>
			<DynamicModal
				isVisible={isModalVisible}
				handleIsVisible={() => setIsModalVisible((prev) => !prev)}
				containerElem={{
					className: 'bg-gray-200 dark:bg-gray-800 p-4 max-w-lg m-auto',
					style: {
						width: 'fit-content',
					},
				}}
			>
				<Fragment key='body'>
					<DeleteProduct
						productData={productData}
						setIsModalVisible={setIsModalVisible}
					/>
				</Fragment>
			</DynamicModal>
		</>
	);
};
