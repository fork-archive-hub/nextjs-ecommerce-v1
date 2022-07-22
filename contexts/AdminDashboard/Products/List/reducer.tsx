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
				console.dir(actionPayload.options);
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
		}

		default: {
			return state;
		}
	}
};
