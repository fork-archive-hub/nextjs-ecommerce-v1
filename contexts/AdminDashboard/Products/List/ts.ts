import { EAdminDashboardProductsListContextConsts } from './constants';

export type TInitialStateScreenSize = number;

interface IProduct {
	title: string;
	price: number;
	images: {
		image: {
			id: string;
			src: string;
			alt: string | null;
		};
	}[];
	brand: string;
	description: string;
	status: string | null;
	countInStock: number;
	id: string;
	createdAt: Date;
	updatedAt: Date;
}

interface IOrderBy {
	by: 'createdAt' | 'updatedAt' | 'countInStock' | 'title' | 'price' | 'brand';
	dir: 'ASC' | 'DESC';
}

export type TInitialState = {
	list: {
		data: IProduct[][];
		page: {
			index: 0;
			orderBy: IOrderBy;
			limit: number;
		};
		orderBy: IOrderBy;
		filterBy?: {
			status?: 'VISIBLE' | 'HIDDEN';
			price?: number;
			priceGT?: number;
			priceLT?: number;
			countInStock?: number;
			countInStockGT?: number;
			countInStockLT?: number;
			createdBefore?: string;
			createdAtAfter?: string;
			updatedBefore?: string;
			updatedAtAfter?: string;
			brand?: string;
			title?: string;
		};
	};
	added: {
		data: IProduct[];
	};
	removed: {
		data: IProduct[];
	};
};

interface ISetReducerAction<Type, Payload = undefined> {
	type: Type;
	payload: Payload;
}

type IActionAdd = ISetReducerAction<
	EAdminDashboardProductsListContextConsts.ADD,
	| {
			type: 'MANY';
			products: IProduct[];
			options?: {
				reset?: boolean;
			};
	  }
	| {
			type: 'ONE';
			product: IProduct;
			options: {
				reset?: boolean;
				type: 'ADDED' | 'REMOVED';
			};
	  }
>;

export type IReducerActions = IActionAdd;
