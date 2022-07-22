import Tooltip from '@components/common/Tooltip';
import { trpc } from '@libs/trpc';
import AdminLayout from 'components/Layouts/admin';
import {
	ColumnDef,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	// RowModel,
	// Table,
	useReactTable,
} from '@tanstack/react-table';
import {
	FormEvent,
	Fragment,
	useEffect,
	useId,
	useMemo,
	useState,
} from 'react';
import { useSharedAdminDashboardState } from 'contexts/AdminDashboard';
import DynamicModal from '@components/common/Modal/Dynamic';
import CustomNextImage from '@components/common/CustomNextImage';
import {
	SharedAdminDashboardProductsListStateProvider,
	useSharedAdminDashboardProductsListState,
} from 'contexts/AdminDashboard/Products/List';
import { EAdminDashboardProductsListContextConsts } from 'contexts/AdminDashboard/Products/List/constants';
import { IProduct } from 'contexts/AdminDashboard/Products/List/ts';

const valuesInit: () => {
	title: string;
	price: number;
	images: string[];
	categories: string[];
	brand: string;
	description: string;
	status: 'VISIBLE' | 'HIDDEN';
	countInStock: number;
} = () => ({
	title: '',
	price: 0,
	images: [''],
	brand: '',
	description: '',
	categories: [''],
	status: 'VISIBLE',
	countInStock: 0,
});

const columnHelper = createColumnHelper<IProduct>();
const columns = [
	columnHelper.accessor('title', {
		cell: (info) => <p>{info.renderValue()}</p>,
	}),
	columnHelper.accessor('price', {
		cell: (info) => <p>{info.renderValue()}</p>,
	}),

	columnHelper.accessor('categories', {
		cell: (info) => {
			const t = info.renderValue();

			return info
				.renderValue<IProduct['categories']>()
				.map((item) => <p key={item.category.id}>{item.category.name}</p>);
		},
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
	columnHelper.accessor('brand', {
		cell: (info) => {
			const data = info.renderValue();

			if (!data) return;
			return <p>{data.name}</p>;
		},
	}),
	columnHelper.accessor('description', {
		cell: (info) => <p>{info.renderValue()}</p>,
	}),
	columnHelper.accessor('status', {
		cell: (info) => <p>{info.renderValue()}</p>,
	}),
	columnHelper.accessor('countInStock', {
		cell: (info) => <p>{info.renderValue()}</p>,
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
];

const CreateProduct = ({
	initValues = {},
}: {
	initValues?: Partial<ReturnType<typeof valuesInit>>;
}) => {
	const [, productsDispatch] = useSharedAdminDashboardProductsListState();
	const createProductMutation = trpc.useMutation([
		'admin.products.createProduct',
	]);

	const fields1Id = useId();
	const [values, setValues] = useState({
		...valuesInit(),
		...initValues,
	});

	const fields1 = [
		{
			label: 'title',
			input: {
				id: fields1Id + 'title',
				name: 'title',
			},
		},
		{
			label: 'categories',
			input: {
				id: fields1Id + 'categories',
				name: 'categories',
			},
		},
		{
			label: 'description',
			textarea: {
				id: fields1Id + 'description',
				name: 'description',
			},
		},
		{
			label: 'images',
			input: {
				id: fields1Id + 'images',
			},
		},
		{
			label: 'brand',
			input: {
				id: fields1Id + 'brand',
			},
		},
		{
			label: 'price',
			input: {
				id: fields1Id + 'price',
				type: 'number',
			},
		},
		{
			label: 'countInStock',
			input: {
				id: fields1Id + 'countInStock',
				type: 'number',
			},
		},
	];

	const fields2 = [
		{
			label: 'visible',
			input: {
				id: fields1Id + 'visible',
				name: 'status',
				value: 'VISIBLE',
				type: 'radio',
			},
		},
		{
			label: 'hidden',
			input: {
				id: fields1Id + 'hidden',
				name: 'status',
				value: 'HIDDEN',
				type: 'radio',
			},
		},
	];

	const handleSubmission = (event: FormEvent) => {
		event.preventDefault();

		if (createProductMutation.isLoading) return;

		createProductMutation.mutate(values);
	};

	useEffect(() => {
		if (createProductMutation.isSuccess /*&& createProductMutation.is*/) {
			// createProductMutation.data.brand.;
			productsDispatch({
				type: EAdminDashboardProductsListContextConsts.ADD,
				payload: {
					type: 'ONE',
					product: {
						...createProductMutation.data,
						// images: [],
						categories: createProductMutation.data.categories.map(
							(item: { category: any }) => ({
								...item,
								category: {
									...item.category,
									images: null,
								},
							})
						),
						brand: {
							...createProductMutation.data.brand,
							images: null,
						},
					},
					options: {
						type: 'ADDED',
					},
				},
			});
		}
	}, [
		createProductMutation.data,
		createProductMutation.isSuccess,
		productsDispatch,
	]);

	return (
		<form
			// action="" method="post"
			onSubmit={handleSubmission}
		>
			<div className='flex'>
				<button
					type='reset'
					className='duration-150 ease-in 
		bg-gray-900 hover:bg-white hover:text-gray-900
		dark:bg-gray-700 dark:hover:text-gray-700
		 px-4 py-2 rounded-md'
					disabled={createProductMutation.isLoading}
					onClick={() => setValues(valuesInit())}
				>
					Reset Form
				</button>
				<span className='p-1'></span>
				<Tooltip
					content={`Init the form inputs to where it was at the begging ex: ${JSON.stringify(
						{ ...valuesInit, ...initValues }
					)}`}
					position='bottomCenter'
					windowCollision
				>
					<button
						type='button'
						className='duration-150 ease-in 
					bg-gray-900 hover:bg-white hover:text-gray-900
		dark:bg-gray-700 dark:hover:text-gray-700
		 px-4 py-2 rounded-md'
						disabled={createProductMutation.isLoading}
						onClick={() =>
							setValues({
								...valuesInit(),
								...initValues,
							})
						}
					>
						Init Form
					</button>
				</Tooltip>
			</div>
			<fieldset className='flex border border-gray-400 border-solid rounded-md'>
				<legend className='px-1'>status</legend>
				<div className='flex'>
					{fields2.map((field, index, arr) => (
						<Fragment key={field.label}>
							<label
								htmlFor={field.input.id}
								className='capitalize my-2 flex cursor-pointer'
							>
								<input
									type={field.input.type}
									value={field.input.value}
									name={field.input.name || field.label}
									id={field.input.id}
									onChange={(event) => {
										setValues((prev) => ({
											...prev,
											[event.target.name]: event.target.value,
										}));
									}}
									// value={values[(field.input.name || field.label) as keyof typeof values]}
									defaultChecked={
										!!(
											values[field.input.name as keyof typeof values] ===
											field.input.value
										)
									}
									className='mx-2'
								/>
								<span>{field.label}</span>
							</label>
							{index !== arr.length - 1 && <span className='px-2' />}
						</Fragment>
					))}
				</div>
			</fieldset>
			{fields1.map((field) => {
				if (field.textarea)
					return (
						<label
							htmlFor={field.textarea.id}
							className='capitalize my-4 block  flex-col cursor-pointer'
							key={field.label}
						>
							<p className='my-2'>{field.label}</p>
							<textarea
								name={field.textarea.name || field.label}
								id={field.textarea.id}
								onChange={(event) => {
									setValues((prev) => ({
										...prev,
										[event.target.name]: event.target.value,
									}));
								}}
								value={(values as any)[field.textarea.name || field.label]}
								className='px-2 py-1 rounded-sm w-full'
							/>
						</label>
					);

				return (
					<label
						htmlFor={field.input.id}
						className='capitalize my-4 block  flex-col cursor-pointer'
						key={field.label}
					>
						<p className='my-2'>{field.label}</p>
						<input
							type={field.input.type || 'text'}
							name={field.input.name || field.label}
							id={field.input.id}
							onChange={(event) => {
								setValues((prev) => ({
									...prev,
									[event.target.name]:
										event.target.type === 'number'
											? parseFloat(event.target.value)
											: field.label === 'images' || field.label === 'categories'
											? event.target.value.split(/\s{1,}/g)
											: event.target.value,
								}));
							}}
							value={
								field.label === 'images' || field.label === 'categories'
									? (values as any)[
											(field.input.name || field.label) as keyof typeof values
									  ].join(' ')
									: values[
											(field.input.name || field.label) as keyof typeof values
									  ]
							}
							className='px-2 py-1 rounded-sm w-full'
						/>
					</label>
				);
			})}
			<div className='my-2'>
				<button
					type='submit'
					className='duration-150 ease-in 
				bg-gray-900 hover:bg-white hover:text-gray-900
				dark:bg-gray-700 dark:hover:text-gray-700
				 px-4 py-2 rounded-md'
					disabled={createProductMutation.isLoading}
				>
					{createProductMutation.isLoading ? 'Loading...' : 'Submit'}
				</button>
			</div>
			{createProductMutation.error && (
				<p className='my-2 bg-red-400 text-red-900 border-red-900 border p-1 rounded-sm  font-bold'>
					Something went wrong! {createProductMutation.error.message}
				</p>
			)}
			{createProductMutation.isSuccess && (
				<p className='my-2 bg-green-400 text-green-900 border-green-900 border p-1 rounded-sm  font-bold'>
					The new product is created successfully!
				</p>
			)}
		</form>
	);
};

const ProductsAddedListTable = () => {
	const [
		{
			added: { data: productsAddedListData },
		},
	] = useSharedAdminDashboardProductsListState();
	const [{ currentColorMode }] = useSharedAdminDashboardState();

	const data = useMemo(
		() => (productsAddedListData ? productsAddedListData : []),
		[productsAddedListData]
	);

	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});

	if (productsAddedListData.length === 0) return <></>;

	return (
		<div className='max-w-full overflow-x-auto mb-12'>
			<header>
				<h2 className='text-4xl font-bold mb-2'>Added Products</h2>
			</header>
			<table
				className='border border-solid border-collapse'
				style={{ borderColor: currentColorMode }}
			>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr
							key={headerGroup.id}
							className='hover:bg-zinc-200 dark:hover:bg-zinc-800'
						>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className='border border-solid p-2 text-center'
									style={{
										backgroundColor: currentColorMode,
										borderColor: currentColorMode,
									}}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr
							key={row.id}
							className='hover:bg-zinc-200 dark:hover:bg-zinc-800 odd:bg-neutral-100 dark:odd:bg-neutral-900'
						>
							{row.getVisibleCells().map((cell) => (
								<td
									key={cell.id}
									className='border border-solid p-2 text-center'
									style={{ borderColor: currentColorMode }}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
				{/* <tfoot>
		{table.getFooterGroups().map(footerGroup => (
			<tr key={footerGroup.id}>
				{footerGroup.headers.map(header => (
					<th key={header.id}>
						{header.isPlaceholder
							? null
							: flexRender(
									header.column.columnDef.footer,
									header.getContext()
								)}
					</th>
				))}
			</tr>
		))}
	</tfoot> */}
			</table>
		</div>
	);
};

const ProductsRemovedListTable = () => {
	const [
		{
			removed: { data: productsRemovedListData },
		},
	] = useSharedAdminDashboardProductsListState();
	const [{ currentColorMode }] = useSharedAdminDashboardState();

	const data = useMemo(
		() => (productsRemovedListData ? productsRemovedListData : []),
		[productsRemovedListData]
	);

	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});

	if (productsRemovedListData.length === 0) return <></>;

	return (
		<div className='max-w-full overflow-x-auto mb-12'>
			<header>
				<h2 className='text-4xl font-bold mb-2'>Removed Products</h2>
			</header>
			<table
				className='border border-solid border-collapse'
				style={{ borderColor: currentColorMode }}
			>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr
							key={headerGroup.id}
							className='hover:bg-zinc-200 dark:hover:bg-zinc-800'
						>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className='border border-solid p-2 text-center'
									style={{
										backgroundColor: currentColorMode,
										borderColor: currentColorMode,
									}}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr
							key={row.id}
							className='hover:bg-zinc-200 dark:hover:bg-zinc-800 odd:bg-neutral-100 dark:odd:bg-neutral-900'
						>
							{row.getVisibleCells().map((cell) => (
								<td
									key={cell.id}
									className='border border-solid p-2 text-center'
									style={{ borderColor: currentColorMode }}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
				{/* <tfoot>
		{table.getFooterGroups().map(footerGroup => (
			<tr key={footerGroup.id}>
				{footerGroup.headers.map(header => (
					<th key={header.id}>
						{header.isPlaceholder
							? null
							: flexRender(
									header.column.columnDef.footer,
									header.getContext()
								)}
					</th>
				))}
			</tr>
		))}
	</tfoot> */}
			</table>
		</div>
	);
};

const ProductsListTable = () => {
	const [
		{
			list: { data: productsListData, page },
		},
	] = useSharedAdminDashboardProductsListState();
	const [{ currentColorMode }] = useSharedAdminDashboardState();

	const data = useMemo(
		() => (productsListData[page.index] ? productsListData[page.index] : []),
		[page.index, productsListData]
	);

	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className='max-w-full overflow-x-auto'>
			<table
				className='border border-solid border-collapse'
				style={{ borderColor: currentColorMode }}
			>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr
							key={headerGroup.id}
							className='hover:bg-zinc-200 dark:hover:bg-zinc-800'
						>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className='border border-solid p-2 text-center'
									style={{
										backgroundColor: currentColorMode,
										borderColor: currentColorMode,
									}}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr
							key={row.id}
							className='hover:bg-zinc-200 dark:hover:bg-zinc-800 odd:bg-neutral-100 dark:odd:bg-neutral-900'
						>
							{row.getVisibleCells().map((cell) => (
								<td
									key={cell.id}
									className='border border-solid p-2 text-center'
									style={{ borderColor: currentColorMode }}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
				{/* <tfoot>
		{table.getFooterGroups().map(footerGroup => (
			<tr key={footerGroup.id}>
				{footerGroup.headers.map(header => (
					<th key={header.id}>
						{header.isPlaceholder
							? null
							: flexRender(
									header.column.columnDef.footer,
									header.getContext()
								)}
					</th>
				))}
			</tr>
		))}
	</tfoot> */}
			</table>
		</div>
	);
};

const ProductsHome = () => {
	const [isCreateProductModalVisible, setIsCreateProductModalVisible] =
		useState(false);
	const [
		{
			list: { data: productsListData, orderBy, page, filterBy },
		},
		productsDispatch,
	] = useSharedAdminDashboardProductsListState();
	const [isEnabled, setIsEnabled] = useState(true);
	const productsFetch = trpc.useQuery(
		[
			'products.all',
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
		<main className='p-4 w-full'>
			<header>
				<h1>Products Page</h1>
			</header>
			<div>
				<button onClick={() => setIsCreateProductModalVisible((prev) => !prev)}>
					Create A new product?
				</button>
				<DynamicModal
					isVisible={isCreateProductModalVisible}
					handleIsVisible={() =>
						setIsCreateProductModalVisible((prev) => !prev)
					}
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
				<ProductsAddedListTable />
				<ProductsRemovedListTable />
				<ProductsListTable />
			</div>
		</main>
	);
};

const PHP = () => (
	<AdminLayout>
		<SharedAdminDashboardProductsListStateProvider>
			<ProductsHome />
		</SharedAdminDashboardProductsListStateProvider>
	</AdminLayout>
);

export default PHP;
