import { EAdminDashboardProductsListContextConsts } from './constants';
import { stateInit } from './initialState';
import { TInitialState, IReducerActions, IAdminDashboardProduct } from './ts';

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
				let listData: typeof state.mainList.data = [];
				if (actionPayload.options?.reset) listData = [actionPayload.products];
				else listData = [...state.mainList.data, actionPayload.products];

				return {
					...state,
					mainList: {
						...state.mainList,
						data: listData,
					},
				};
			}

			return state;
		}

		case EAdminDashboardProductsListContextConsts.UPDATE: {
			const { productId, newData, isProductUpdated, removed } = action.payload;

			if (!isProductUpdated) return state;

			let targetedProduct: IAdminDashboardProduct | undefined;
			const productCoordinates = {
				mainList: {
					page: -1,
					pageItem: -1,
				},
				addedList: {
					index: -1,
				},
			};

			state.mainList.data.find((page, pageIndex) => {
				targetedProduct = page.find((product, productIndex) => {
					if (product.id === productId) {
						productCoordinates.mainList.pageItem = productIndex;
						return true;
					}
					return false;
				});

				if (!!targetedProduct) productCoordinates.mainList.page = pageIndex;

				return !!targetedProduct;
			});

			state.added.data.find((product, productIndex) => {
				if (product.id === productId) {
					productCoordinates.addedList.index = productIndex;
					if (!targetedProduct) targetedProduct = product;
					return !!targetedProduct;
				}
			});

			if (!targetedProduct) return state;
			targetedProduct;

			if (newData.basicData) {
				targetedProduct = {
					...targetedProduct,
					status: newData.basicData.status,
					title: newData.basicData.title,
					price: newData.basicData.price,
					description: newData.basicData.description,
					countInStock: newData.basicData.countInStock,
					updatedAt: newData.basicData.updatedAt,
				};
			}

			if (newData.brandUpserted) {
				const brand = (targetedProduct.brand || { brand: { images: [] } })
					.brand;

				targetedProduct = {
					...targetedProduct,
					brand: {
						brand: {
							...brand,
							...newData.brandUpserted,
						},
					},
				};
			}

			if (newData.imagesCreated) {
				let images = targetedProduct.images || [];
				const removedImagesIds = removed.imagesIds;

				if (Array.isArray(removedImagesIds) && removedImagesIds.length !== 0) {
					images = images.filter(
						(item) => !removedImagesIds.includes(item.image.id)
					);
				}

				targetedProduct = {
					...targetedProduct,
					images: [
						...images,
						...newData.imagesCreated.map((item) => ({ image: item })),
					],
				};
			}

			if (newData.categoriesUpserted) {
				let categories = targetedProduct.categories || [];
				const removedCategoriesNames = removed.categoriesNames;

				if (
					Array.isArray(removedCategoriesNames) &&
					removedCategoriesNames.length !== 0
				) {
					categories = categories.filter(
						(item) => !removedCategoriesNames.includes(item.category.name)
					);
				}

				targetedProduct = {
					...targetedProduct,
					categories: [
						...categories,
						...newData.categoriesUpserted.map((item) => ({
							category: { ...item, images: [] },
						})),
					],
				};
			}

			if (!targetedProduct) return state;

			return {
				...state,
				mainList:
					productCoordinates.mainList.page === -1
						? state.mainList
						: {
								...state.mainList,
								data: state.mainList.data.map((page, pageIndex) => {
									if (pageIndex === productCoordinates.mainList.page) {
										return page.map((product, productIndex) => {
											if (productIndex === productCoordinates.mainList.pageItem)
												return targetedProduct as IAdminDashboardProduct;

											return product;
										});
									}

									return page;
								}),
						  },
				added:
					productCoordinates.addedList.index === -1
						? state.added
						: {
								...state.added,
								data: state.added.data.map((product, productIndex) => {
									if (productCoordinates.addedList.index === productIndex)
										return targetedProduct as IAdminDashboardProduct;

									return product;
								}),
						  },
			};
		}

		default: {
			return state;
		}
	}
};
