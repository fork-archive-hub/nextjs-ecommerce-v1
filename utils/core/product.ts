import { IAdminDashboardProduct } from '@components/layouts/Admin/context/Products/List/ts';

export const checkProductStatusOrThrow = (status: string) => {
	if (status === 'VISIBLE' || status === 'HIDDEN') return status;

	throw new Error(`Status is Unknown: ${status}`);
};

export const checkProductObjStatusOrThrow = (
	product: IAdminDashboardProduct
) => {
	if (product.status === 'VISIBLE' || product.status === 'HIDDEN')
		return product as Omit<IAdminDashboardProduct, 'status'> & {
			status: 'VISIBLE' | 'HIDDEN';
		};

	throw new Error(`Status is Unknown: ${product.status}`);
};
