import { EAppContextConsts } from './constants';

export type TInitialStateScreenSize = number;

export interface IInitialState {
	screenSize?: TInitialStateScreenSize;
	isSideMenuActive: boolean;
	isClicked: {
		chat: boolean;
		cart: boolean;
		userProfile: boolean;
		notification: boolean;
		clicked: boolean;
	};
}

interface ISetReducerAction<Type, Payload = undefined> {
	type: Type;
	payload: Payload;
}
type TSetScreenSize = ISetReducerAction<
	EAppContextConsts.SET_SCREEN_SIZE,
	{
		screenSize: number;
	}
>;
type TSetIsSideMenuActive = ISetReducerAction<
	EAppContextConsts.SET_IS_MENU_ACTIVE,
	{
		isSideMenuActive: boolean;
	}
>;
export type TSetIsClicked = ISetReducerAction<
	EAppContextConsts.SET_IS_CLICKED,
	{ isClickedItem: keyof IInitialState['isClicked'] }
>;

export type IReducerActions =
	| TSetScreenSize
	| TSetIsSideMenuActive
	| TSetIsClicked;
