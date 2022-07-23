import CustomNextImage from '@components/common/CustomNextImage';
import { createColumnHelper } from '@tanstack/react-table';
import { IProduct } from 'contexts/AdminDashboard/Products/List/ts';

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
					{data?.type.includes('DELETE') && <></>}
					{data?.type.includes('UPDATE') && <></>}
				</>
			);
		},
	}),
];
