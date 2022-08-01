import { ReactNode, useEffect } from 'react';
import { SharedMainStateProvider, useSharedMainState } from './context';
import {
	setCurrentBgColorMode,
	setCurrentFontColorMode,
	setThemeMode,
} from './context/actions';

interface IProps {
	children: JSX.Element;
}

const Layout = ({ children }: IProps) => {
	const [, dispatch] = useSharedMainState();

	useEffect(() => {
		const lsBgColorMode = localStorage.getItem('currentBgColorMode');
		const lsFontColorMode = localStorage.getItem('currentFontColorMode');
		const lsThemeMode = localStorage.getItem('currentThemeMode');

		if (lsBgColorMode) setCurrentBgColorMode(dispatch, lsBgColorMode);
		if (lsFontColorMode) setCurrentFontColorMode(dispatch, lsFontColorMode);
		if (lsThemeMode && (lsThemeMode == 'light' || lsThemeMode == 'dark'))
			setThemeMode(dispatch, lsThemeMode);
		else setThemeMode(dispatch, 'dark');
	}, [dispatch]);

	return children;
};

const MainLayout = ({ children }: IProps) => {
	return (
		<SharedMainStateProvider>
			<Layout>{children}</Layout>
		</SharedMainStateProvider>
	);
};

export default MainLayout;
