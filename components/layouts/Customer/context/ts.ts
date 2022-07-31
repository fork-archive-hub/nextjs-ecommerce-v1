import { ECustomerContextConsts } from './constants';

export type TInitialStateScreenSize = number;

export interface IInitialState {
	isVisible: {
		sideNav: boolean;
	};
}

interface ISetReducerAction<Type, Payload = undefined> {
	type: Type;
	payload: Payload;
}

type TSetCurrentBgColorMode = ISetReducerAction<
	ECustomerContextConsts.SET_TOGGLE_IS_VISIBLE_ONE_ITEM_AND_INIT_EVERTHING_ELSE,
	{
		isVisible: keyof IInitialState['isVisible'];
	}
>;

export type IReducerActions = TSetCurrentBgColorMode;
