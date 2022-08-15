import DashboardLayoutWithContext from '@components/layouts/Dashboard';
import DashboardStoresScreen from '@components/screens/Dashboard/screens/Stores';
import { NextPage } from 'next';

interface Props {}

const DashboardPage: NextPage<Props> = () => {
	return (
		<DashboardLayoutWithContext>
			<DashboardStoresScreen />
		</DashboardLayoutWithContext>
	);
};

export default DashboardPage;
