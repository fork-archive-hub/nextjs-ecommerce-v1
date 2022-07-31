import { IInitialState } from './ts';

export const initIsVisible = (): IInitialState['isVisible'] => ({
	sideNav: false,
});

export const initState = (): IInitialState => ({
	isVisible: initIsVisible(),
});
