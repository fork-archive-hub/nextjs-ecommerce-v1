import CustomNextImage from '@components/common/CustomNextImage';
import DynamicModal from '@components/common/Modal/Dynamic';
import { createColumnHelper } from '@tanstack/react-table';
import { useSharedAdminDashboardState } from 'contexts/AdminDashboard';
import { IAdminDashboardProduct } from 'contexts/AdminDashboard/Products/List/ts';
import { useState, Fragment } from 'react';
import DeleteProduct from '../Action/ActionTypes/Delete';
import UpdateProduct from '../Action/ActionTypes/Update';

const columnHelper = createColumnHelper<
	IAdminDashboardProduct & {
		mutate: {
			data: IAdminDashboardProduct;
			type?: ('UPDATE' | 'DELETE')[];
		};
	}
>();
export const productTableDefaultColumns = [
	columnHelper.accessor('status', {
		cell: (info) => <p>{info.renderValue()}</p>,
	}),
	columnHelper.accessor('images', {
		cell: (info) => {
			const data = info.renderValue<IAdminDashboardProduct['images']>();

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

			if (!data?.type || !Array.isArray(data.type) || data.type.length === 0)
				return <></>;

			return (
				<>
					{data.type.includes('UPDATE') && (
						<>
							<UpdateProductButton
								productData={
									data.data as Omit<IAdminDashboardProduct, 'status'> & {
										status: 'VISIBLE' | 'HIDDEN';
									}
								}
							/>
						</>
					)}
					{data.type.includes('DELETE') && (
						<DeleteProductButton
							productData={
								data.data as Omit<IAdminDashboardProduct, 'status'> & {
									status: 'VISIBLE' | 'HIDDEN';
								}
							}
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
	const [{ currentColorMode }] = useSharedAdminDashboardState();
	const [isModalVisible, setIsModalVisible] = useState(false);

	return (
		<>
			<button
				className='px-2 py-1 m-1 rounded'
				style={{ backgroundColor: currentColorMode }}
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
	const [{ currentColorMode }] = useSharedAdminDashboardState();
	const [isModalVisible, setIsModalVisible] = useState(false);

	return (
		<>
			<button
				className='px-2 py-1 m-1 rounded'
				style={{ backgroundColor: currentColorMode }}
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
