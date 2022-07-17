import { IInitialState } from './ts';

export const initialState: IInitialState = {
	screenSize: undefined,
	currentColorMode: '#374151',
	currentThemeMode: 'dark',
	themeSettings: false,
	isSideMenuActive: true,
	isClicked: {
		chat: false,
		cart: false,
		userProfile: false,
		notification: false,
		clicked: false,
	},
};
