import { InferQueryOutput } from './../../../../utils/trpc/types';
import { Dispatch } from 'react';
import { InferMutationInput, InferMutationOutput } from 'utils/trpc/types';
import { EAdminDashboardProductsListContextConsts } from './constants';

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

export type IAdminDashboardProducts = InferQueryOutput<'admin.products.all'>;
export type IAdminDashboardProduct = IAdminDashboardProducts[0];

export type TInitialState = {
	mainList: {
		data: IAdminDashboardProducts[];
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
		data: IAdminDashboardProducts;
	};
	removed: {
		data: IAdminDashboardProducts;
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
			products: IAdminDashboardProducts;
			options?: {
				reset?: boolean;
			};
	  }
	| {
			type: 'ONE';
			product: IAdminDashboardProduct;
			options: {
				reset?: boolean;
				type: 'ADDED' | 'REMOVED';
			};
	  }
>;

type TAdminProductsUpdateProductInput =
	InferMutationInput<'admin.products.updateProduct'>;

type TUpdateAction = ISetReducerAction<
	EAdminDashboardProductsListContextConsts.UPDATE,
	{
		productId: string;
		removed: {
			categoriesNames: NonNullable<
				TAdminProductsUpdateProductInput['categories']
			>['removedNames'];
			imagesIds: NonNullable<
				TAdminProductsUpdateProductInput['images']
			>['removedIds'];
		};
	} & InferMutationOutput<'admin.products.updateProduct'>
>;

export type IReducerActions = IActionAdd | TUpdateAction;

export type TProductListDispatch =
	| Dispatch<IReducerActions>
	| ((value: IReducerActions) => void);
