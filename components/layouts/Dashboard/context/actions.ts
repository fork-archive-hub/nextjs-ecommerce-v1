import { Dispatch } from 'react';
import { EAppContextConsts } from './constants';
import {
	IInitialState,
	IReducerActions,
	TInitialStateScreenSize,
	// TSetIsClicked,
} from './ts';

export const setScreenSize = (
	dispatch: Dispatch<IReducerActions>,
	screenSize: TInitialStateScreenSize
) => {
	dispatch({
		type: EAppContextConsts.SET_SCREEN_SIZE,
		payload: {
			screenSize,
		},
	});
};

export const setIsSideMenuActive = (
	dispatch: Dispatch<IReducerActions>,
	isSideMenuActive: IInitialState['isSideMenuActive']
) => {
	dispatch({
		type: EAppContextConsts.SET_IS_MENU_ACTIVE,
		payload: {
			isSideMenuActive,
		},
	});
};

export const handleIsClick = (
	dispatch: Dispatch<IReducerActions>,
	{
		isClickedItem,
	}: // isClickedState,
	{
		isClickedItem: keyof IInitialState['isClicked'];
		isClickedState: IInitialState['isClicked'][keyof IInitialState['isClicked']];
	}
) => {
	dispatch({
		type: EAppContextConsts.SET_IS_CLICKED,
		payload: {
			isClickedItem,
		},
	});
};

// const initialStateIsClicked = {
// 	chat: false,
// 	cart: false,
// 	userProfile: false,
// 	notification: false,
// };
// const handleClick = (clicked) =>
// 	setIsClicked({ ...initialStateIsClicked, [clicked]: true });
