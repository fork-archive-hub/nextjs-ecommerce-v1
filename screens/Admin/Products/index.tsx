import { SharedAdminDashboardProductsListStateProvider } from '@components/layouts/Admin/context/Products/List';

import AdminLayout from 'components/layouts/Admin';
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
