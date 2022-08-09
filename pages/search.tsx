import CustomerLayout from '@components/layouts/Customer';
import prisma from '@libs/prisma';
import { trpc } from '@libs/trpc';
import {
	productsBrandsAndCategoriesNames,
	productsFilteredByController,
} from '@utils/core/products/controllers';
import { InferQueryInput, InferQueryOutput } from '@utils/trpc/types';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	FormEvent,
	InputHTMLAttributes,
	useEffect,
	useId,
	useState,
} from 'react';
import superjson from 'superjson';

type TProductsFilteredByInputs = InferQueryInput<'products.filteredBy'>;

type TProductsFilteredByInputsKeys = keyof Required<TProductsFilteredByInputs>;

interface IBasicFormField {
	__type: 'BASIC_FORM_FIELD';
	title: string;
	id: string;
	name: TProductsFilteredByInputsKeys;
	type?: InputHTMLAttributes<HTMLInputElement>['type'];
	default?: string;
}

type TBrandsAndCategoriesNames = {
	brands: {
		name: string;
	}[];
	categories: {
		name: string;
	}[];
};

interface Props {
	brandsAndCategoriesNames: {
		status: 'success';
		data: InferQueryOutput<'products.brandsAndCategoriesNames'>;
	};
	products: {
		status: 'success';
		data: InferQueryOutput<'products.filteredBy'>;
	};
	input?: TProductsFilteredByInputs;
}

const Search: NextPage<Props> = (props) => {
	useEffect(() => {}, []);
	const formFieldsId = useId();
	const router = useRouter();
	const [isProductsFilteredByEnabled, sertIsProductsFilteredByEnabled] =
		useState(false);
	const [isBrandsAndCategoriesNames, sertIsBrandsAndCategoriesNames] =
		useState(false);
	const [inputs, setInputs] = useState<
		Omit<TProductsFilteredByInputs, 'price' | 'countInStock'> & {
			price: Required<TProductsFilteredByInputs>['price'];
			countInStock: Required<TProductsFilteredByInputs>['countInStock'];
		}
	>({
		price: {},
		countInStock: {},
		...(props.input || {}),
	});

	const productsFilteredByQuery = trpc.useQuery(
		['products.filteredBy', inputs],
		{
			initialData: props.brandsAndCategoriesNames.data,
			enabled: isProductsFilteredByEnabled,
		}
	);

	const brandsAndCategoriesNames = trpc.useQuery(
		['products.brandsAndCategoriesNames'],
		{
			initialData: props.products.status,
			enabled: isBrandsAndCategoriesNames,
		}
	);

	console.log('props.products', props.products);
	console.log('props.input', props.input);

	const formFields: (
		| IBasicFormField
		| {
				__type: 'GT_LT_NUMBER_RANGE';
				title: string;
				name: TProductsFilteredByInputsKeys;
				// type: 'number';
				fields: (Omit<IBasicFormField, 'type' | 'name'> & {
					name: 'gte' | 'lte';
				})[];
		  }
		| (Omit<IBasicFormField, '__type' | 'type'> & {
				__type: 'BRANDS_AND_CATEGORIES_NAMES';
				type: 'radio' | 'checkbox';
				dataQueryResult: typeof brandsAndCategoriesNames;
		  })
	)[] = [
		{
			__type: 'BASIC_FORM_FIELD',
			title: 'Title',
			id: `${formFieldsId}-title`,
			name: 'title',
		},
		{
			__type: 'GT_LT_NUMBER_RANGE',
			title: 'Price',
			name: 'price',
			// type: 'number',
			fields: [
				{
					__type: 'BASIC_FORM_FIELD',
					title: 'Greater than',
					id: `${formFieldsId}-price-gte`,
					name: 'gte',
				},
				{
					__type: 'BASIC_FORM_FIELD',
					title: 'Less than',
					id: `${formFieldsId}-price-lte`,
					name: 'lte',
				},
			],
		},
		{
			__type: 'GT_LT_NUMBER_RANGE',
			title: 'Count in stock',
			name: 'countInStock',
			// type: 'number',
			fields: [
				{
					__type: 'BASIC_FORM_FIELD',
					title: 'Greater than',
					id: `${formFieldsId}-count-in-stock-gte`,
					name: 'gte',
				},
				{
					__type: 'BASIC_FORM_FIELD',
					title: 'Less than',
					id: `${formFieldsId}-count-in-stock-lte`,
					name: 'lte',
				},
			],
		},
		{
			__type: 'BRANDS_AND_CATEGORIES_NAMES',
			title: 'Brands name',
			id: `${formFieldsId}-brands-name`,
			name: 'brandName',
			type: 'radio',
			dataQueryResult: brandsAndCategoriesNames,
		},
		{
			__type: 'BRANDS_AND_CATEGORIES_NAMES',
			title: 'Categories',
			id: `${formFieldsId}-categories-name`,
			name: 'categoriesNames',
			type: 'checkbox',
			dataQueryResult: brandsAndCategoriesNames,
		},
		// {
		// 	__type: 'BASIC_FORM_FIELD',
		// 	title: 'Created at',
		// 	id: `${formFieldsId}-created-at`,
		// 	name: 'createdAt',
		// 	type: 'date',
		// },
	];

	/*
		limit?: number | undefined;
	*/

	const handleSubmission = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const inputsSynth = (() => {
			const inputsSynth: { [key: string]: any } = {};

			let key: keyof typeof inputs;
			for (key in inputs) {
				const item = inputs[key];
				if (
					!item ||
					typeof item === 'undefined' ||
					(typeof item === 'object' && Object.keys(item).length === 0)
				) {
					continue;
				}

				inputsSynth[key] = inputs[key];
			}

			return inputsSynth;
		})();

		// console.log('inputsSynth', inputsSynth);
		router.push({
			query: { input: superjson.stringify(inputsSynth) },
		});

		// productsFilteredBy.refetch();
	};

	return (
		<CustomerLayout>
			<main>
				<h1>Hello</h1>
				<form onSubmit={handleSubmission}>
					{formFields.map((field) => {
						if (field.__type === 'BASIC_FORM_FIELD')
							return (
								<label key={field.name} id={field.id}>
									<span>{field.title}</span>
									<input
										type={field.type || 'text'}
										name={field.name}
										id={field.id}
										value={(() => {
											const inputField = inputs[field.name];

											if (typeof inputField === 'object') {
												if ('toDateString' in inputField) {
													return new Date(inputField).toISOString();
												} else return '';
											}

											return inputField;
										})()}
										onChange={(event) => {
											setInputs((prev) => ({
												...prev,
												[event.target.name]: event.target.value,
											}));
										}}
									/>
								</label>
							);

						if (field.__type === 'GT_LT_NUMBER_RANGE')
							return (
								<fieldset key={field.name}>
									<legend>{field.title}</legend>
									<div>
										{field.fields.map((subField) => (
											<label key={subField.name} id={subField.id}>
												<span>{subField.title}</span>
												<input
													type='number'
													name={subField.name}
													id={subField.id}
													onChange={(event) => {
														setInputs((prev) => {
															const prevFieldName = prev[field.name];
															const targetedInput =
																prevFieldName &&
																typeof prevFieldName === 'object' &&
																('gte' in prevFieldName ||
																	'lte' in prevFieldName)
																	? prevFieldName
																	: {};
															targetedInput;

															// typeof
															return {
																...prev,
																[field.name]: {
																	...targetedInput,
																	[event.target.name]: event.target.value,
																},
															};
														});
													}}
												/>
											</label>
										))}
									</div>
								</fieldset>
							);

						// if (field.type === 'radio')
						// 	return (
						// 		<fieldset key={field.name}>
						// 			<legend>{field.name}</legend>
						// 			<div>{field.dataQueryResult.isLoading && <p>Loading</p>}</div>
						// 			{field.dataQueryResult.}
						// 		</fieldset>
						// 	);

						// // if (field.type === 'checkbox')
						// return (
						// 	<fieldset key={field.name}>
						// 		<legend>{field.name}</legend>
						// 		<div>{field.dataQueryResult.isLoading && <p>Loading</p>}</div>
						// 	</fieldset>
						// );

						return <fieldset key={field.name}></fieldset>;
					})}
					<div>
						<button type='submit'>Submit</button>
					</div>
				</form>
			</main>
		</CustomerLayout>
	);
};

export default Search;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const input =
		typeof context.query.input === 'string'
			? (() => {
					const inputParse = superjson.parse(context.query.input);
					if (inputParse && typeof inputParse === 'object') return inputParse;

					return {};
			  })()
			: {};

	return {
		props: {
			brandsAndCategoriesNames: await productsBrandsAndCategoriesNames({
				prisma: prisma,
			})
				.then((data) => ({ status: 'success', data }))
				.catch((error) => ({
					status: 'error',
					data: [],
					message: error.message,
				})),
			products: await productsFilteredByController({
				prisma: prisma,
				input,
			})
				.then((data) => ({ status: 'success', data }))
				.catch((error) => ({
					status: 'error',
					data: [],
					message: error.message,
				})),
			input,
		},
	};
};
