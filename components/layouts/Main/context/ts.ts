import { EMainContextConsts } from './constants';

// export type TInitialStateScreenSize = number;

export interface IInitialState {
	currentBgColorMode: string;
	currentFontColorMode: string;
	currentThemeMode: 'light' | 'dark';
	themeSettings: boolean;
}

interface ISetReducerAction<Type, Payload = undefined> {
	type: Type;
	payload: Payload;
}
// type TSetScreenSize = ISetReducerAction<
// 	EMainContextConsts.SET_SCREEN_SIZE,
// 	{
// 		screenSize: number;
// 	}
// >;

type TSetCurrentBgColorMode = ISetReducerAction<
	EMainContextConsts.SET_CURRENT_COLOR_MODE,
	{
		currentBgColorMode: string;
	}
>;

type TSetCurrentFontColorMode = ISetReducerAction<
	EMainContextConsts.SET_CURRENT_COLOR_MODE,
	{
		currentFontColorMode: string;
	}
>;
type TSetCurrentThemeMode = ISetReducerAction<
	EMainContextConsts.SET_CURRENT_THEME_MODE,
	{
		currentThemeMode: IInitialState['currentThemeMode'];
	}
>;
type TSetThemeSettings = ISetReducerAction<
	EMainContextConsts.SET_THEME_SETTINGS,
	{
		themeSettings: boolean;
	}
>;

export type IReducerActions =
	// | TSetScreenSize
	| TSetCurrentBgColorMode
	| TSetCurrentFontColorMode
	| TSetCurrentThemeMode
	| TSetThemeSettings;
