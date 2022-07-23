import { EAdminDashboardProductsListContextConsts } from './constants';

export type TInitialStateScreenSize = number;

const t = {
	id: '',
	title: '',
	price: 0,
	images: [],
	brand: '',
	description: '',
	categories: [],
	status: 'VISIBLE',
	countInStock: 0,
	createdAt: new Date().toUTCString(),
	updatedAt: new Date().toUTCString(),
};

export type IProduct = {
	id: string;
	title: string;
	price: number;
	images:
		| {
				image: {
					id: string;
					src: string;
					alt: string | null;
				};
		  }[]
		| null;
	description: string;
	categories: {
		category: {
			images:
				| {
						image: {
							id: string;
							src: string;
							alt: string | null;
						};
				  }[]
				| null;
			name: string;
			createdAt: Date;
			count: number;
		};
	}[];

	brand: {
		brand: {
			images:
				| {
						image: {
							id: string;
							src: string;
							alt: string | null;
						};
				  }[]
				| null;
			name: string;
			createdAt: Date;
		};
	} | null;
	status: string | null;
	countInStock: number;
	createdAt: Date;
	updatedAt: Date;
};

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
