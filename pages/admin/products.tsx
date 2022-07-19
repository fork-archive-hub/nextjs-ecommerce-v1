import Tooltip from '@components/common/Tooltip';
import { trpc } from '@libs/trpc';
import AdminLayout from 'components/Layouts/admin';
import {
	ColumnDef,
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

const valuesInit: () => {
	title: string;
	price: number;
	images: string[];
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
	status: 'VISIBLE',
	countInStock: 0,
});

const CreateProduct = ({
	initValues = {},
}: {
	initValues?: Partial<ReturnType<typeof valuesInit>>;
}) => {
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
											: field.label === 'images'
											? event.target.value.split(/\s{1,}/g)
											: event.target.value,
								}));
							}}
							value={
								field.label === 'images'
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

const columns: ColumnDef<
	{
		id: string;
		title: string;
		price: number;
		images: {
			image: {
				id: string;
				src: string;
				alt: string | null;
			};
		}[];
		brand: string;
		description: string;
		status: string | null;
		countInStock: number;
		createdAt: Date;
		updatedAt: Date;
	},
	unknown
>[] = [
	{
		// Header: 'Title',
		accessorKey: 'title',
		cell: (info) => <p>{info.getValue()}</p>,
	},
	{
		// Header: 'Price',
		accessorKey: 'price',
		cell: (info) => <p>{info.getValue()}</p>,
	},
	{
		// Header: 'Image',
		accessorKey: 'images',
		cell: (info) => {
			const t = info.getValue();

			return info
				.getValue<
					{
						image: {
							id: string;
							src: string;
							alt?: string | null;
						};
					}[]
				>()
				.map((item) => (
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
	},
	{
		// Header: 'Brand',
		accessorKey: 'brand',
		cell: (info) => <p>{info.getValue()}</p>,
	},
	{
		// Header: 'Description',
		accessorKey: 'description',
		cell: (info) => <p>{info.getValue()}</p>,
	},
	{
		// Header: 'Status',
		accessorKey: 'status',
		cell: (info) => <p>{info.getValue()}</p>,
	},
	{
		// Header: 'CountInStock',
		accessorKey: 'countInStock',
		cell: (info) => <p>{info.getValue()}</p>,
	},
	{
		// Header: 'Created At',
		accessorKey: 'createdAt',
		cell: (info) => <p>{new Date(info.getValue()).toLocaleString()}</p>,
	},
	{
		// Header: 'Updated At',
		accessorKey: 'updatedAt',
		cell: (info) => <p>{new Date(info.getValue()).toLocaleString()}</p>,
	},
];

const ProductsHome = () => {
	const [{ currentColorMode }, dispatch] = useSharedAdminDashboardState();
	const [isCreateProductModalVisible, setIsCreateProductModalVisible] =
		useState(false);
	const [isEnabled, setIsEnabled] = useState(true);
	const products = trpc.useQuery(['products.all'], {
		initialData: [],
		enabled: isEnabled,
	});

	const data = useMemo(
		() => (!products.data ? [] : products.data),
		[products.data]
	);

	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});

	useEffect(() => setIsEnabled(false), []);

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
								images: [''],
								brand: '',
								description: '',
								status: 'VISIBLE',
								countInStock: 0,
							}}
						/>
					</Fragment>
				</DynamicModal>
			</div>
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
		</main>
	);
};

const PHP = () => (
	<AdminLayout>
		<ProductsHome />
	</AdminLayout>
);

export default PHP;
