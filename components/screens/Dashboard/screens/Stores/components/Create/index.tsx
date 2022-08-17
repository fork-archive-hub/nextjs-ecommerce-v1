import Tooltip from '@components/common/Tooltip';
import { trpc } from '@libs/trpc';
import { useSharedMainState } from '@components/layouts/Main/context';
// import { useSharedAdminDashboardStoresListState } from '@components/layouts/Admin/context/Stores/List';
// import { EAdminDashboardStoresListContextConsts } from '@components/layouts/Admin/context/Stores/List/constants';
import { useId, useState, FormEvent, useEffect, Fragment } from 'react';
import { buildButtonClassName } from '@utils/tailwind';
import { InferMutationInput } from '@utils/trpc/types';
import { useSession } from 'next-auth/react';

const valuesInit: () => InferMutationInput<'stores.createOne'> = () => ({
	title: '',
	description: '',
	address: {
		streetAddress: '',
		city: '',
		country: '',
		postalCode: '',
	},
	image: {
		src: '',
		alt: '',
	},
});

enum EFormFields {
	NORMAL_INPUT = 'NORMAL_INPUT',
	NORMAL_TEXTAREA = 'NORMAL_TEXTAREA',
	INPUTS_FIELDSET = 'INPUTS_FIELDSET',
}

const CreateStore = ({
	initValues = {},
	originListType,
	removedStoreOldId,
	handleCloseModalOnSuccessfulSubmission,
}: {
	initValues?: Partial<ReturnType<typeof valuesInit>>;
	originListType?: 'REMOVED';
	removedStoreOldId?: string;
	handleCloseModalOnSuccessfulSubmission?: () => void;
}) => {
	const formFieldsId = useId();
	const trpcContext = trpc.useContext();
	const [{ currentBgColorMode, currentFontColorMode }, mainDispatch] =
		useSharedMainState();
	// const [, storesDispatch] = useSharedAdminDashboardStoresListState();
	const { data: session } = useSession();
	const createStore = trpc.useMutation('stores.createOne', {
		onSuccess: (data) => {
			trpcContext.setQueryData(
				['stores.getStores'],
				(prevData) => {
					// if (Array.isArray(prevData)) {
					// 	let newData = {
					// 		...data.store,
					// 		// address: data.address || null,
					// 		// image: data.image || null,
					// 	};
					// 	let item = prevData[0];
					// 	newData = item;
					// }
					const newProduct = {
						...data.store,
						address: data.address || null,
						image: data.image || null,
					};

					return Array.isArray(prevData)
						? [...prevData, newProduct]
						: [newProduct];
				} // [] // prevData || []
			);
		},
	});

	const [values, setValues] = useState({
		...valuesInit(),
		...initValues,
	});

	const formFields = [
		{
			__type: EFormFields.NORMAL_INPUT,
			name: 'title',
			id: `${formFieldsId}-title`,
			title: 'Title',
		},
		{
			__type: EFormFields.NORMAL_TEXTAREA,
			name: 'description',
			id: `${formFieldsId}-description`,
			title: 'Description',
		},
		{
			__type: EFormFields.NORMAL_INPUT,
			name: 'image',
			id: `${formFieldsId}-image`,
			title: 'Image',
			pathMap: ['image', 'src'],
		},
		{
			__type: EFormFields.INPUTS_FIELDSET,
			legend: 'Address',
			name: 'address',
			id: `${formFieldsId}-address`,
			list: [
				{
					__type: EFormFields.NORMAL_INPUT,
					title: 'Street address',
					name: 'streetAddress',
					id: `${formFieldsId}-address-address`,
				},
				{
					__type: EFormFields.NORMAL_INPUT,
					title: 'City',
					name: 'city',
					id: `${formFieldsId}-address-city`,
				},
				{
					__type: EFormFields.NORMAL_INPUT,
					title: 'Country',
					name: 'country',
					id: `${formFieldsId}-address-country`,
				},
				{
					__type: EFormFields.NORMAL_INPUT,
					title: 'Postal Code',
					name: 'postalCode',
					id: `${formFieldsId}-address-postalCode`,
					isOptional: true,
				},
			],
		},
	] as const;

	const handleSubmission = async (event: FormEvent) => {
		event.preventDefault();

		const result = await createStore
			.mutateAsync(values)
			.catch((err) => console.error(err.message));
	};

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
					disabled={createStore.isLoading}
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
						disabled={createStore.isLoading}
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
			{formFields.map((field) => {
				if (
					field.__type === EFormFields.NORMAL_TEXTAREA ||
					field.__type === EFormFields.NORMAL_INPUT
				)
					return (
						<label
							htmlFor={field.id}
							className='capitalize my-4 block  flex-col cursor-pointer'
							key={field.name}
						>
							<span className='my-2'>{field.name}</span>
							{field.__type === EFormFields.NORMAL_TEXTAREA && (
								<textarea
									name={field.name}
									id={field.id}
									onChange={(event) => {
										setValues((prev) => ({
											...prev,
											[event.target.name]: event.target.value,
										}));
									}}
									value={(values as any)[field.name]}
									className='px-2 py-1 rounded-sm w-full'
								/>
							)}
							{field.__type === EFormFields.NORMAL_INPUT && (
								<input
									type='text'
									name={field.name}
									id={field.id}
									onChange={(event) => {
										if ('pathMap' in field) {
											setValues((prev) => {
												const paths: { [key: string]: any }[] = [];
												let i = 0;
												for (; i < field.pathMap.length; i++) {
													let key = field.pathMap[i] as keyof typeof prev;
													let value = prev[key];
													if (!value || typeof value !== 'object')
														throw new Error('');

													if (i === field.pathMap.length - 2) {
														paths[i] = {
															...value,
															[field.pathMap[i + 1] as keyof typeof prev]:
																event.target.value,
														};

														break;
													}
													if (typeof key === 'string') {
														paths[i] = value;
													}
												}

												i = field.pathMap.length - 2;

												let obj: { [key: string]: any } = paths[i];

												for (; i >= 0; i--) {
													let key = field.pathMap[i] as keyof typeof prev;

													obj = {
														...paths[i],
														[key]: obj,
													};
												}

												obj = {
													...prev,
													...obj,
												};

												return obj as typeof prev;
											});
											return;
										}

										setValues((prev) => ({
											...prev,
											[event.target.name]: event.target.value,
										}));
									}}
									value={
										field.name === 'image'
											? (values as any)[field.name].src
											: (values as any)[field.name]
									}
									className='px-2 py-1 rounded-sm w-full'
								/>
							)}
						</label>
					);

				if (
					field.__type === EFormFields.INPUTS_FIELDSET &&
					'list' in field &&
					Array.isArray(field.list)
				) {
					return (
						<fieldset key={field.name}>
							<legend>{field.legend}</legend>
							<div className=''>
								{field.list.map((subField) => (
									<label
										htmlFor={subField.id}
										className='capitalize my-4 block  flex-col cursor-pointer'
										key={subField.name}
									>
										<span className='my-2'>{subField.title}</span>
										{subField.__type === EFormFields.NORMAL_INPUT && (
											<input
												type='text'
												name={subField.name}
												id={subField.id}
												onChange={(event) => {
													setValues((prev) => ({
														...prev,
														[field.name]: {
															...prev[field.name],
															[event.target.name]: event.target.value,
														},
													}));
												}}
												value={
													values[field.name][subField.name]
													// typeof values[field.name] === 'object' ? values[field.name][subField.name] : undefined
													// (values as any)[subField.name || subField.name]
												}
												className='px-2 py-1 rounded-sm w-full'
											/>
										)}
									</label>
								))}
							</div>
						</fieldset>
					);
				}
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
					disabled={createStore.isLoading}
				>
					{createStore.isLoading ? 'Loading...' : 'Submit'}
				</button>
			</div>
			{createStore.error && (
				<p className='my-2 bg-red-400 text-red-900 border-red-900 border p-1 rounded-sm  font-bold'>
					Something went wrong! {createStore.error.message}
				</p>
			)}
			{createStore.isSuccess && (
				<p className='my-2 bg-green-400 text-green-900 border-green-900 border p-1 rounded-sm  font-bold'>
					The new store is created successfully!
				</p>
			)}
		</form>
	);
};

export default CreateStore;
