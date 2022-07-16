import AdminLayout from 'components/Layouts/admin';
import { Fragment, useId, useState } from 'react';

const ProductsHome = () => {
	const fields1Id = useId();
	const [values, setValue] = useState({
		title: '',
		price: 0,
		image: '',
		brand: '',
		description: '',
		status: 'VISIBLE',
		countInStock: 0,
	});

	console.dir(values);
	/*

  categories        CategoriesOnProducts[]
  productOnOrder    ProductsOnOrder[]
	*/
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
			label: 'image',
			input: {
				id: fields1Id + 'image',
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
	return (
		<AdminLayout>
			<main className='p-4'>
				<header>
					<h1>Products Page</h1>
				</header>
				<div>
					<form
					// action="" method="post"
					>
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
													setValue((prev) => ({
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
												setValue((prev) => ({
													...prev,
													[event.target.name]: event.target.value,
												}));
											}}
											value={
												values[
													(field.textarea.name ||
														field.label) as keyof typeof values
												]
											}
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
											setValue((prev) => ({
												...prev,
												[event.target.name]: event.target.value,
											}));
										}}
										value={
											values[
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
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</main>
		</AdminLayout>
	);
};

export default ProductsHome;
