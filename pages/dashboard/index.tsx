import DashboardLayoutWithContext from '@components/layouts/Dashboard';
import DashboardScreen from '@components/screens/Dashboard';
import { NextPage } from 'next';

interface Props {}

const DashboardPage: NextPage<Props> = () => {
	return (
		<DashboardLayoutWithContext>
			<DashboardScreen />
		</DashboardLayoutWithContext>
	);
};

export default DashboardPage;
