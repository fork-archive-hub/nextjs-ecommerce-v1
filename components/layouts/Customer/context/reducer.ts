import { ECustomerContextConsts } from './constants';
import { initIsVisible } from './initialState';
import { IInitialState, IReducerActions } from './ts';

export const reducer = (state: IInitialState, action: IReducerActions) => {
	switch (action.type) {
		case ECustomerContextConsts.SET_TOGGLE_IS_VISIBLE_ONE_ITEM_AND_INIT_EVERTHING_ELSE: {
			return {
				...state,
				isVisible: {
					...initIsVisible(),
					[action.payload.isVisible]:
						!state.isVisible[action.payload.isVisible],
				},
			};
		}
		default:
			return state;
	}
};
