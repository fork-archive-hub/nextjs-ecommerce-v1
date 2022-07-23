import { SharedAdminDashboardProductsListStateProvider } from 'contexts/AdminDashboard/Products/List';

import AdminLayout from 'components/Layouts/Admin';
import AdminProducts from '@components/Admin/Products';

type Props = {};

const AdminProductsScreen = (props: Props) => {
	return (
		<AdminLayout>
			<SharedAdminDashboardProductsListStateProvider>
				<AdminProducts />
			</SharedAdminDashboardProductsListStateProvider>
		</AdminLayout>
	);
};

export default AdminProductsScreen;
