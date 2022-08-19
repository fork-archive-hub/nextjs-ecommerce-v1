import Tooltip from '@components/common/Tooltip';
import { useSharedMainState } from '@components/layouts/Main/context';
import { trpc } from '@libs/trpc';
import { useSharedAdminDashboardProductsListState } from '@components/layouts/Admin/context/Products/List';
import { EAdminDashboardProductsListContextConsts } from '@components/layouts/Admin/context/Products/List/constants';
import { IAdminDashboardProduct } from '@components/layouts/Admin/context/Products/List/ts';
import {
	useId,
	useState,
	FormEvent,
	useEffect,
	Fragment,
	useRef,
	useMemo,
} from 'react';
import { arrRemovedAndAdded } from '@utils/arrays';
import { buildButtonClassName } from '@utils/tailwind';
import { InferMutationInput } from '@utils/trpc/types';

type TUpdateProductMutationInput =
	InferMutationInput<'admin.products.updateProduct'>;
type TBasicData = TUpdateProductMutationInput['basicData'];
type TBrand = TUpdateProductMutationInput['brand'];
type TCategories = TUpdateProductMutationInput['categories'];
type TImages = TUpdateProductMutationInput['images'];

interface IValues {
	title: string;
	price: number;
	images: string[];
	categories: string[];
	brand: string;
	description: string;
	status: 'VISIBLE' | 'HIDDEN';
	countInStock: number;
}

const valuesInit: () => IValues = () => ({
	title: '',
	price: 0,
	images: [],
	brand: '',
	description: '',
	categories: [],
	status: 'VISIBLE',
	countInStock: 0,
});

const UpdateProduct = ({
	productData,
}: {
	productData: Omit<IAdminDashboardProduct, 'status'> & {
		status: 'VISIBLE' | 'HIDDEN';
	};
}) => {
	const [, productsDispatch] = useSharedAdminDashboardProductsListState();
	const [{ currentBgColorMode, currentFontColorMode }, mainDispatch] =
		useSharedMainState();
	const updateProductMutation = trpc.useMutation([
		'admin.products.updateProduct',
	]);

	const removedRef = useRef<{
		categoriesNames: string[] | undefined;
		imagesIds: string[] | undefined;
	}>({
		categoriesNames: undefined,
		imagesIds: undefined,
	});
	const initValues = useMemo(
		() => ({
			title: productData.title,
			price: productData.price,
			images: !productData.images
				? []
				: productData.images.map((item) => item.image.src),
			brand: !productData.brand ? '' : productData.brand.brand.name,
			description: productData.description,
			categories: !productData.categories
				? []
				: productData.categories.map((item) => item.category.name),
			status: productData.status,
			countInStock: productData.countInStock,
		}),
		[
			productData.brand,
			productData.categories,
			productData.countInStock,
			productData.description,
			productData.images,
			productData.price,
			productData.status,
			productData.title,
		]
	);
	const productId = productData.id;

	const fields1Id = useId();
	const [values, setValues] = useState<IValues>(initValues);

	const buttonClassName = buildButtonClassName();

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

		if (updateProductMutation.isLoading) return;

		const productDataUpdated = {
			basicData: false,
			brand: false,
			categories: false,
			images: false,
		};

		let basicData: TBasicData = {};
		let brand: TBrand;
		let categories: TCategories = {};
		let images: TImages = {};

		{
			if (values.status !== initValues.status) {
				basicData.status = values.status;
				if (!productDataUpdated.basicData) productDataUpdated.basicData = true;
			}
			if (values.title !== initValues.title) {
				basicData.title = values.title;
				if (!productDataUpdated.basicData) productDataUpdated.basicData = true;
			}
			if (values.price !== initValues.price) {
				basicData.price = values.price;
				if (!productDataUpdated.basicData) productDataUpdated.basicData = true;
			}
			if (values.description !== initValues.description) {
				basicData.description = values.description;
				if (!productDataUpdated.basicData) productDataUpdated.basicData = true;
			}
			if (values.countInStock !== initValues.countInStock) {
				basicData.countInStock = values.countInStock;
				if (!productDataUpdated.basicData) productDataUpdated.basicData = true;
			}
		}

		{
			if (values.brand !== initValues.brand) {
				brand = {
					new: values.brand,
					old: initValues.brand,
				};
				if (!productDataUpdated.brand) productDataUpdated.brand = true;
			}
		}

		{
			const { added: addedNames, removed: removedNames } = arrRemovedAndAdded(
				initValues.categories,
				values.categories
			);

			if (removedNames.length !== 0) {
				categories.removedNames = removedNames;
				removedRef.current.categoriesNames = removedNames;
				if (!productDataUpdated.categories)
					productDataUpdated.categories = true;
			}
			if (addedNames.length !== 0) {
				categories.addedNames = addedNames;
				if (!productDataUpdated.categories)
					productDataUpdated.categories = true;
			}
		}

		{
			const mainImagesObj = productData.images;

			if (mainImagesObj) {
				const imagesAddedLinks: string[] = values.images.filter((link) =>
					mainImagesObj.find((mainLink) => mainLink.image.src !== link)
				);
				const imagesRemovedIds: string[] = [];
				mainImagesObj.forEach(
					(item) =>
						values.images.find((link) => link !== item.image.src) &&
						imagesRemovedIds.push(item.image.id)
				);

				if (imagesAddedLinks.length !== 0) {
					images.addedLinks = imagesAddedLinks;
					productDataUpdated.images = true;
				}
				if (imagesRemovedIds.length !== 0) {
					images.removedIds = imagesRemovedIds;
					removedRef.current.imagesIds = imagesRemovedIds;
					if (!productDataUpdated.images) productDataUpdated.images = true;
				}
			}
		}

		let toUpdate = false;
		if (!productDataUpdated.basicData) {
			basicData = undefined;
		} else if (!toUpdate) toUpdate = true;
		if (!productDataUpdated.brand) {
			brand = undefined;
		} else if (!toUpdate) toUpdate = true;
		if (!productDataUpdated.categories) {
			categories = undefined;
		} else if (!toUpdate) toUpdate = true;
		if (!productDataUpdated.images) {
			images = undefined;
		} else if (!toUpdate) toUpdate = true;

		if (toUpdate) {
			updateProductMutation.mutate({
				// values
				productId,
				basicData,
				brand,
				categories,
				images,
			});
		}
	};

	useEffect(() => {
		if (updateProductMutation.isSuccess /*&& updateProductMutation.is*/) {
			// initValuesRef.current = {
			// 	// ...initValuesRef.current,
			// 	// updateProductMutation

			// };
			updateProductMutation.data;
			productsDispatch({
				type: EAdminDashboardProductsListContextConsts.UPDATE,
				payload: {
					isProductUpdated: updateProductMutation.data.isProductUpdated,
					newData: updateProductMutation.data.newData,
					productId: productData.id,
					removed: {
						categoriesNames: removedRef.current.categoriesNames,
						imagesIds: removedRef.current.imagesIds,
					},
				},
			});

			removedRef.current = {
				categoriesNames: undefined,
				imagesIds: undefined,
			};
		}
	}, [
		updateProductMutation.data,
		updateProductMutation.isSuccess,
		productsDispatch,
		productData.id,
	]);

	return (
		<form
			// action="" method="post"
			onSubmit={handleSubmission}
		>
			<div className='flex'>
				<button
					type='reset'
					className={buttonClassName} // 'duration-150 ease-in  bg-gray-900 hover:bg-zinc-100 hover:text-gray-900 dark:bg-gray-700 dark:hover:text-gray-700 px-4 py-2 rounded-md'
					style={{
						backgroundColor: currentBgColorMode,
						color: currentFontColorMode,
					}}
					disabled={updateProductMutation.isLoading}
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
						className={buttonClassName} // 'duration-150 ease-in  bg-gray-900 hover:bg-zinc-100 hover:text-gray-900 dark:bg-gray-700 dark:hover:text-gray-700 px-4 py-2 rounded-md'
						style={{
							backgroundColor: currentBgColorMode,
							color: currentFontColorMode,
						}}
						disabled={updateProductMutation.isLoading}
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
					className={buttonClassName} // 'duration-150 ease-in  bg-gray-900 hover:bg-zinc-100 hover:text-gray-900 dark:bg-gray-700 dark:hover:text-gray-700 px-4 py-2 rounded-md'
					style={{
						backgroundColor: currentBgColorMode,
						color: currentFontColorMode,
					}}
					disabled={updateProductMutation.isLoading}
				>
					{updateProductMutation.isLoading ? 'Loading...' : 'Submit'}
				</button>
			</div>
			{updateProductMutation.error && (
				<p className='my-2 bg-red-400 text-red-900 border-red-900 border p-1 rounded-sm  font-bold'>
					Something went wrong! {updateProductMutation.error.message}
				</p>
			)}
			{updateProductMutation.isSuccess && (
				<p className='my-2 bg-green-400 text-green-900 border-green-900 border p-1 rounded-sm  font-bold'>
					The new product is updated successfully!
				</p>
			)}
		</form>
	);
};

export default UpdateProduct;
