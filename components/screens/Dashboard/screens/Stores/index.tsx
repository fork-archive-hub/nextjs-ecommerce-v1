import { trpc } from '@libs/trpc';
import { InferQueryOutput } from '@utils/trpc/types';
import { useState } from 'react';
import CreateStoreButton from './components/Create/Button';

const StoreShowCase = ({
	store,
}: {
	store: InferQueryOutput<'stores.getStores'>[0];
}) => {
	const [isSectionVisible, setIsSectionVisible] = useState(false);

	return (
		<div key={store.id} className='p-4'>
			<header className='flex w-full items-center justify-between'>
				<h3>{store.title}</h3>
				<button onClick={() => setIsSectionVisible((prev) => !prev)}>x</button>
			</header>
			{isSectionVisible && (
				<div>
					<div className=''>
						<p>
							{store.description} /{' '}
							{typeof store.productsCounter === 'number' &&
								`${store.productsCounter}`}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

const DashboardStoresScreen = () => {
	const [getStoresEnabled, setGetStoresEnabled] = useState(true);
	const getStores = trpc.useQuery(['stores.getStores'], {
		refetchInterval: 5 * 60 * 1000,
		enabled: getStoresEnabled,
		onSuccess: () => setGetStoresEnabled(false),
	});

	console.log('getStores.data', getStores.data);

	return (
		<main>
			<CreateStoreButton />
			DashboardStoresScreen
			<div className=''>
				{getStores.isSuccess &&
					getStores.data.map((store) => (
						<StoreShowCase key={store.id} store={store} />
					))}
			</div>
		</main>
	);
};

export default DashboardStoresScreen;
