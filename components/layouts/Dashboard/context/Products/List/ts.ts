import { Dispatch } from 'react';
import {
	InferMutationInput,
	InferMutationOutput,
	InferQueryOutput,
} from '@utils/trpc/types';
import { EDashboardDashboardProductsListContextConsts } from './constants';

export type TInitialStateScreenSize = number;

// export type IProduct = {
// 	id: string;
// 	title: string;
// 	price: number;
// 	images:
// 		| {
// 				image: {
// 					id: string;
// 					src: string;
// 					alt: string | null;
// 				};
// 		  }[]
// 		| null;
// 	description: string;
// 	categories: {
// 		category: {
// 			images:
// 				| {
// 						image: {
// 							id: string;
// 							src: string;
// 							alt: string | null;
// 						};
// 				  }[]
// 				| null;
// 			name: string;
// 			createdAt: Date;
// 			count: number;
// 		};
// 	}[];

// 	brand: {
// 		brand: {
// 			images:
// 				| {
// 						image: {
// 							id: string;
// 							src: string;
// 							alt: string | null;
// 						};
// 				  }[]
// 				| null;
// 			name: string;
// 			createdAt: Date;
// 		};
// 	} | null;
// 	status: string | null;
// 	countInStock: number;
// 	createdAt: Date;
// 	updatedAt: Date;
// };

interface IOrderBy {
	by: 'createdAt' | 'updatedAt' | 'countInStock' | 'title' | 'price' | 'brand';
	dir: 'ASC' | 'DESC';
}

export type IDashboardDashboardProducts =
	InferQueryOutput<'admin.products.all'>;
export type IDashboardDashboardProduct = IDashboardDashboardProducts[0];

export type TInitialState = {
	mainList: {
		data: IDashboardDashboardProducts[];
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
		data: IDashboardDashboardProducts;
	};
	removed: {
		data: IDashboardDashboardProducts;
	};
};

interface ISetReducerAction<Type, Payload = undefined> {
	type: Type;
	payload: Payload;
}

type ttt = IDashboardDashboardProduct['brand'];
// ttt

type IActionAdd = ISetReducerAction<
	EDashboardDashboardProductsListContextConsts.ADD,
	| {
			type: 'MANY';
			products: IDashboardDashboardProducts;
			options?: {
				reset?: boolean;
			};
	  }
	| {
			type: 'ONE';
			product: IDashboardDashboardProduct;
			options: {
				reset?: boolean;
				type: 'ADDED' | 'REMOVED';
				originListType?: 'REMOVED';
				removedProductOldId?: string;
			};
	  }
>;

type TDashboardProductsUpdateProductInput =
	InferMutationInput<'admin.products.updateProduct'>;

type TUpdateAction = ISetReducerAction<
	EDashboardDashboardProductsListContextConsts.UPDATE,
	{
		productId: string;
		removed: {
			categoriesNames: NonNullable<
				TDashboardProductsUpdateProductInput['categories']
			>['removedNames'];
			imagesIds: NonNullable<
				TDashboardProductsUpdateProductInput['images']
			>['removedIds'];
		};
	} & InferMutationOutput<'admin.products.updateProduct'>
>;
type TDeleteAction = ISetReducerAction<
	EDashboardDashboardProductsListContextConsts.DELETE,
	{ productId: string }
>;

export type IReducerActions = IActionAdd | TUpdateAction | TDeleteAction;

export type TProductListDispatch =
	| Dispatch<IReducerActions>
	| ((value: IReducerActions) => void);
