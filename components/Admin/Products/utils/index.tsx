import CustomNextImage from '@components/common/CustomNextImage';
import DynamicModal from '@components/common/Modal/Dynamic';
import { createColumnHelper } from '@tanstack/react-table';
import { IProduct } from 'contexts/AdminDashboard/Products/List/ts';
import { useState, Fragment } from 'react';
import UpdateProduct from '../Action/ActionTypes/Update';

const columnHelper = createColumnHelper<
	IProduct & {
		mutate: {
			data: IProduct;
			type: ('UPDATE' | 'DELETE')[];
		};
	}
>();
export const productTableDefaultColumns = [
	columnHelper.accessor('status', {
		cell: (info) => <p>{info.renderValue()}</p>,
	}),
	columnHelper.accessor('images', {
		cell: (info) => {
			const data = info.renderValue<IProduct['images']>();

			if (!data) return <></>;

			return data.map((item) => (
				<CustomNextImage
					key={item.image.id}
					src={item.image.src}
					alt={item.image.alt || ''}
					className='w-20 h-20 object-contain'
					width={80}
					height={80}
				/>
			));
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
				.renderValue<IProduct['categories']>()
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

			return (
				<>
					{data?.type.includes('DELETE') && (
						<UpdateProductButton
							productData={
								data.data as Omit<IProduct, 'status'> & {
									status: 'VISIBLE' | 'HIDDEN';
								}
							}
						/>
					)}
					{data?.type.includes('UPDATE') && <></>}
				</>
			);
		},
	}),
];

const UpdateProductButton = ({
	productData,
}: {
	productData: Omit<IProduct, 'status'> & {
		status: 'VISIBLE' | 'HIDDEN';
	};
}) => {
	const [isCreateProductModalVisible, setIsCreateProductModalVisible] =
		useState(false);

	return (
		<>
			<button onClick={() => setIsCreateProductModalVisible((prev) => !prev)}>
				Update
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
					<UpdateProduct productData={productData} />
				</Fragment>
			</DynamicModal>
		</>
	);
};
