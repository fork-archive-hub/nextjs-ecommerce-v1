import Tooltip from '@components/common/Tooltip';
import { trpc } from '@libs/trpc';
import { useSharedMainState } from '@components/layouts/Main/context';
import { useId, useState, FormEvent, useEffect, Fragment } from 'react';
import { buildButtonClassName } from '@utils/tailwind';
import { InferMutationInput, InferQueryInput } from '@utils/trpc/types';

const valuesInit: () => Omit<
	InferMutationInput<'stores.products.createOne'>,
	'storeId'
> =
	/*{
	title: string;
	price: number;
	images: string[];
	categories: string[];
	brand: string;
	description: string;
	status: 'VISIBLE' | 'HIDDEN';
	countInStock: number;
}*/
	() => ({
		title: '',
		price: 0,
		images: [],
		brand: '',
		description: '',
		categories: [],
		status: 'VISIBLE',
		countInStock: 0,
	});

const CreateOneProduct = ({
	storeId,
	initValues = {},
	originListType,
	removedProductOldId,
	handleCloseModalOnSuccessfulSubmission,
	currentPageIndex,
}: {
	storeId: string;
	currentPageIndex: number;
	initValues?: Partial<ReturnType<typeof valuesInit>>;
	originListType?: 'REMOVED';
	removedProductOldId?: string;
	handleCloseModalOnSuccessfulSubmission?: () => void;
}) => {
	const [{ currentBgColorMode, currentFontColorMode }, mainDispatch] =
		useSharedMainState();
	// const trpcContext = trpc.useContext();
	const createOne = trpc.useMutation(['stores.products.createOne'], {
		// onSuccess: (data) => {
		// 	trpcContext.setInfiniteQueryData(
		// 		['stores.products.getMany'],
		// 		(prevData) => {
		// 			if (!prevData) return { pages: [], pageParams: [] };
		// 			const newData = {
		// 				...prevData,
		// 				pages: prevData.pages.map((page, pageIndex) => {
		// 					if (currentPageIndex === pageIndex) {
		// 						return {
		// 							...page,
		// 							data: [
		// 								{
		// 									...data,
		// 									categories: data.categories.map((item) => ({
		// 										...item,
		// 										createdAt: new Date(),
		// 										category: {
		// 											images: [],
		// 											...item.category,
		// 										},
		// 									})),
		// 									brand: {
		// 										createdAt: new Date(),
		// 										brand: {
		// 											// images: [],
		// 											images: [],
		// 											...data.brand,
		// 										},
		// 									},
		// 									images: data.images.map((img) => ({
		// 										...img,
		// 										createdAt: new Date(),
		// 									})),
		// 								},
		// 								...page.data,
		// 							],
		// 						};
		// 					}
		// 					return page;
		// 				}),
		// 			};
		// 			console.log('data', data);
		// 			console.log('newData', newData);
		// 			// prevData.pages[currentPageIndex].data.push({
		// 			// 	...data,
		// 			// 	categories: data.categories.map((item) => ({
		// 			// 		...item,
		// 			// 		createdAt: new Date(),
		// 			// 		category: {
		// 			// 			images: [],
		// 			// 			...item.category,
		// 			// 		},
		// 			// 	})),
		// 			// 	brand: {
		// 			// 		createdAt: new Date(),
		// 			// 		brand: {
		// 			// 			// images: [],
		// 			// 			images: [],
		// 			// 			...data.brand,
		// 			// 		},
		// 			// 	},
		// 			// 	images: data.images.map((img) => ({
		// 			// 		...img,
		// 			// 		createdAt: new Date(),
		// 			// 	})),
		// 			// });
		// 			return newData;
		// 		}
		// 	);
		// },
	});

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
			textarea: {
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

		if (createOne.isLoading) return;

		createOne.mutate({
			...values,
			storeId,
		});
	};

	useEffect(() => {
		if (createOne.isSuccess /*&& createOne.is*/) {
			// createOne.data.brand.;
			// productsDispatch({
			// 	type: EAdminDashboardProductsListContextConsts.ADD,
			// 	payload: {
			// 		type: 'ONE',
			// 		product: {
			// 			...createOne.data,
			// 			categories: createOne.data.categories.map((item) => ({
			// 				...item,
			// 				createdAt: new Date(),
			// 				category: {
			// 					images: [],
			// 					...item.category,
			// 				},
			// 			})),
			// 			brand: {
			// 				createdAt: new Date(),
			// 				brand: {
			// 					// images: [],
			// 					images: [],
			// 					...createOne.data.brand,
			// 				},
			// 			},
			// 			images: createOne.data.images.map((img) => ({
			// 				...img,
			// 				createdAt: new Date(),
			// 			})),
			// 		},
			// 		options: {
			// 			type: 'ADDED',
			// 			originListType,
			// 			removedProductOldId,
			// 		},
			// 	},
			// });
			if (typeof handleCloseModalOnSuccessfulSubmission === 'function')
				handleCloseModalOnSuccessfulSubmission();
		}
	}, [
		createOne.data,
		createOne.isSuccess,
		handleCloseModalOnSuccessfulSubmission,
		originListType,
		removedProductOldId,
	]);

	const buttonClassName = buildButtonClassName();

	return (
		<form
			// action="" method="post"
			onSubmit={handleSubmission}
		>
			<div className='flex'>
				<button
					type='reset'
					className={buttonClassName}
					style={{
						color: currentFontColorMode,
						backgroundColor: currentBgColorMode,
					}}
					//  bg-gray-900 hover:bg-white hover:text-gray-900
					// dark:bg-gray-700 dark:hover:text-gray-700
					disabled={createOne.isLoading}
					onClick={() => setValues(valuesInit())}
				>
					Reset Form
				</button>
				<span className='p-1'></span>
				<Tooltip
					content={`Init the form inputs to where it was at the beginning ex: ${JSON.stringify(
						{ ...valuesInit, ...initValues }
					)}`}
					position='bottomCenter'
					windowCollision
				>
					<button
						type='button'
						className={buttonClassName}
						style={{
							color: currentFontColorMode,
							backgroundColor: currentBgColorMode,
						}}
						//  bg-gray-900 hover:bg-white hover:text-gray-900
						// dark:bg-gray-700 dark:hover:text-gray-700
						disabled={createOne.isLoading}
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
					className={buttonClassName}
					style={{
						color: currentFontColorMode,
						backgroundColor: currentBgColorMode,
					}}
					//  bg-gray-900 hover:bg-white hover:text-gray-900
					// dark:bg-gray-700 dark:hover:text-gray-700
					disabled={createOne.isLoading}
				>
					{createOne.isLoading ? 'Loading...' : 'Submit'}
				</button>
			</div>
			{createOne.error && (
				<p className='my-2 bg-red-400 text-red-900 border-red-900 border p-1 rounded-sm  font-bold'>
					Something went wrong! {createOne.error.message}
				</p>
			)}
			{createOne.isSuccess && (
				<p className='my-2 bg-green-400 text-green-900 border-green-900 border p-1 rounded-sm  font-bold'>
					The new product is created successfully!
				</p>
			)}
		</form>
	);
};

export default CreateOneProduct;
