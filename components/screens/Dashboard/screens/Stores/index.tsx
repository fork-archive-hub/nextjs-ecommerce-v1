import CustomNextImage from '@components/common/CustomNextImage';
import { trpc } from '@libs/trpc';
import Link from 'next/link';
import { Fragment, useRef, useState } from 'react';
import CreateStoreButton from './components/Create/Button';

const DashboardStoresScreen = () => {
	const [getStoresEnabled, setGetStoresEnabled] = useState(true);
	const getStores = trpc.useQuery(['stores.getStores'], {
		refetchInterval: 5 * 60 * 1000,
		enabled: getStoresEnabled,
		onSuccess: () => setGetStoresEnabled(false),
	});

	return (
		<main className='p-4 h-full-content-page overflow-auto'>
			<CreateStoreButton />
			<div className='flex flex-wrap justify-evenly items-center'>
				{getStores.isSuccess &&
					getStores.data.map((store, storeIndex, storesArr) => (
						// <StoreShowCase key={store.id} store={store} />
						<Fragment key={store.id}>
							<Link href={`/dashboard/stores/${store.id}`}>
								<a className='w-56 h-96 bg-gray-700 bg-opacity-90 my-4 text-zinc-100'>
									<div className='flex flex-col w-full h-full p-4'>
										<div className='w-full aspect-square bg-gray-900'>
											<CustomNextImage
												src={store.image?.src || ''}
												alt={store.image?.alt || ''}
												width={200}
												height={200}
												className='w-full h-full object-contain'
											/>
										</div>
										<h4 className='text-2xl font-medium'>{store.title}</h4>
									</div>
								</a>
							</Link>
							{storeIndex !== storesArr.length - 1 && <span className='px-2' />}
						</Fragment>
					))}
			</div>
		</main>
	);
};

export default DashboardStoresScreen;
