import { IInitialState } from './ts';

export const initialState: IInitialState = {
	screenSize: undefined,
	isSideMenuActive: true,
	isClicked: {
		chat: false,
		cart: false,
		userProfile: false,
		notification: false,
		clicked: false,
	},
};
