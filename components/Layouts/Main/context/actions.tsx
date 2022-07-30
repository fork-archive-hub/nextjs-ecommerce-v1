import { Dispatch } from 'react';
import { EMainContextConsts } from './constants';
import { IInitialState, IReducerActions, TInitialStateScreenSize } from './ts';

export const setThemeMode = (
	dispatch: Dispatch<IReducerActions>,
	currentThemeMode: IInitialState['currentThemeMode']
) => {
	dispatch({
		type: EMainContextConsts.SET_CURRENT_THEME_MODE,
		payload: {
			currentThemeMode,
		},
	});

	console.log('currentThemeMode', currentThemeMode);

	console.log(localStorage.getItem('currentThemeMode'));
	if (localStorage.getItem('currentThemeMode') !== currentThemeMode)
		localStorage.setItem('currentThemeMode', currentThemeMode);
};

export const setCurrentBgColorMode = (
	dispatch: Dispatch<IReducerActions>,
	currentBgColorMode: IInitialState['currentBgColorMode']
) => {
	// setCurrentColor(currentBgColorMode);
	dispatch({
		type: EMainContextConsts.SET_CURRENT_COLOR_MODE,
		payload: {
			currentBgColorMode,
		},
	});

	if (localStorage.getItem('currentBgColorMode') !== currentBgColorMode)
		localStorage.setItem('currentBgColorMode', currentBgColorMode);
};

export const setCurrentFontColorMode = (
	dispatch: Dispatch<IReducerActions>,
	currentFontColorMode: IInitialState['currentFontColorMode']
) => {
	// setCurrentColor(currentFontColorMode);
	dispatch({
		type: EMainContextConsts.SET_CURRENT_COLOR_MODE,
		payload: {
			currentFontColorMode,
		},
	});

	if (localStorage.getItem('currentFontColorMode') !== currentFontColorMode)
		localStorage.setItem('currentFontColorMode', currentFontColorMode);
};

export const setThemeSettings = (
	dispatch: Dispatch<IReducerActions>,
	themeSettings: IInitialState['themeSettings']
) => {
	dispatch({
		type: EMainContextConsts.SET_THEME_SETTINGS,
		payload: {
			themeSettings,
		},
	});
};

// export const setScreenSize = (
// 	dispatch: Dispatch<IReducerActions>,
// 	screenSize: TInitialStateScreenSize
// ) => {
// 	dispatch({
// 		type: EMainContextConsts.SET_SCREEN_SIZE,
// 		payload: {
// 			screenSize,
// 		},
// 	});
// };
