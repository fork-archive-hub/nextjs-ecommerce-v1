import { EMainContextConsts } from './constants';
import { IInitialState, IReducerActions } from './ts';

const initialStateIsClicked = {
	chat: false,
	cart: false,
	userProfile: false,
	notification: false,
	clicked: false,
};

export const reducer = (state: IInitialState, action: IReducerActions) => {
	switch (action.type) {
		case EMainContextConsts.SET_CURRENT_COLOR_MODE:
		case EMainContextConsts.SET_CURRENT_THEME_MODE:
		case EMainContextConsts.SET_THEME_SETTINGS: {
			return {
				...state,
				...action.payload,
			};
		}
		// case EMainContextConsts.SET_IS_CLICKED: {
		// 	return {
		// 		...state,
		// 		isClicked: {
		// 			...initialStateIsClicked,
		// 			[action.payload.isClickedItem]: true,
		// 		},
		// 	};
		// }
		default:
			return state;
	}
};
