import { EAdminDashboardProductsListContextConsts } from './constants';
import { stateInit } from './initialState';
import { TInitialState, IReducerActions } from './ts';

export const reducer = (
	state = stateInit(),
	action: IReducerActions
): TInitialState => {
	switch (action.type) {
		case EAdminDashboardProductsListContextConsts.ADD: {
			const actionPayload = action.payload;

			if (actionPayload.type === 'ONE') {
				if (actionPayload.options.type === 'ADDED') {
					return {
						...state,
						added: {
							data: [...state.added.data, actionPayload.product],
						},
					};
				} else if (actionPayload.options.type === 'REMOVED')
					return {
						...state,
						removed: {
							data: [...state.removed.data, actionPayload.product],
						},
					};
			} else {
				let listData: typeof state.list.data = [];
				if (actionPayload.options?.reset) listData = [actionPayload.products];
				else listData = [...state.list.data, actionPayload.products];

				return {
					...state,
					list: {
						...state.list,
						data: listData,
					},
				};
			}

			return state;
		}

		case EAdminDashboardProductsListContextConsts.UPDATE: {
			const { productId, newData, isProductUpdated, currentPageIndex } =
				action.payload;

			let targetedProduct = state.list.data[currentPageIndex].find(
				(product) => product.id === productId
			);

			if (targetedProduct) {
				targetedProduct = {
					...targetedProduct,
					...(() => {
						if (!newData.basicData) return {};

						return {
							status: newData.basicData.status,
							title: newData.basicData.title,
							price: newData.basicData.price,
							description: newData.basicData.description,
							countInStock: newData.basicData.countInStock,
							updatedAt: newData.basicData.updatedAt,
						};
					})(),
					...(() => {
						if (!newData.brandUpserted) return {};

						const brand = (targetedProduct.brand || { brand: { images: null } })
							.brand;

						return {
							brand: {
								brand: {
									...brand,
									...newData.brandUpserted,
								},
							},
						};
					})(),
					...(() => {
						if (!newData.imagesCreated) return {};

						const images = targetedProduct.images || [];

						return {
							images: [
								...images,
								...newData.imagesCreated.map((item) => ({ image: item })),
							],
						};
					})(),
					...(() => {
						if (!newData.categoriesUpserted) return {};

						const categories = targetedProduct.categories || [];

						return {
							categories: [
								...categories,
								...newData.categoriesUpserted.map((item) => ({
									category: { ...item, images: null },
								})),
							],
						};
					})(),
				};
			}

			return state;
		}

		default: {
			return state;
		}
	}
};
