import { Dispatch } from 'react';
import { ECustomerContextConsts } from './constants';
import {
	IInitialState,
	IReducerActions,
	// TSetIsClicked,
} from './ts';

const setIsVisibleOnly = (
	dispatch: Dispatch<IReducerActions>,
	isVisible: keyof IInitialState['isVisible']
) => {
	dispatch({
		type: ECustomerContextConsts.SET_TOGGLE_IS_VISIBLE_ONE_ITEM_AND_INIT_EVERTHING_ELSE,
		payload: {
			isVisible,
		},
	});
};

export const customerGlobalActions = {
	setIsVisibleOnly,
};
