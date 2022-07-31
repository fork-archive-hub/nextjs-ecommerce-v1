import { ReactNode, useEffect } from 'react';
import { SharedMainStateProvider, useSharedMainState } from './context';
import {
	setCurrentBgColorMode,
	setCurrentFontColorMode,
	setThemeMode,
} from './context/actions';

interface IProps {
	children: ReactNode;
}

const Layout = ({ children }: IProps) => {
	const [
		{
			// isSideMenuActive,
			currentThemeMode,
			// isClicked
		},
		dispatch,
	] = useSharedMainState();

	useEffect(() => {
		const lsBgColorMode = localStorage.getItem('currentBgColorMode');
		const lsFontColorMode = localStorage.getItem('currentFontColorMode');
		const lsThemeMode = localStorage.getItem('currentThemeMode');

		if (lsBgColorMode) setCurrentBgColorMode(dispatch, lsBgColorMode);
		if (lsFontColorMode) setCurrentFontColorMode(dispatch, lsFontColorMode);
		if (lsThemeMode && (lsThemeMode == 'light' || lsThemeMode == 'dark')) {
			setThemeMode(dispatch, lsThemeMode);
		}
		// Check to see if Media-Queries are supported
		else if (window.matchMedia) {
			// Check if the dark-mode Media-Query matches
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				// Dark
				document.body.classList.add('dark');
				document.body.classList.remove('light');
				setThemeMode(dispatch, 'dark');
			} else {
				// Light
				setThemeMode(dispatch, 'light');
				document.body.classList.remove('dark');
				document.body.classList.add('light');
			}
		} else {
			// Default (when Media-Queries are not supported)
			setThemeMode(dispatch, 'light');
			document.body.classList.remove('dark');
			document.body.classList.add('light');
		}
	}, [dispatch]);
	useEffect(() => {
		const currentMetaColorScheme = document.querySelector(
			'meta[name=color-scheme]'
		);
		if (currentMetaColorScheme) {
			currentMetaColorScheme.setAttribute('content', currentThemeMode);
		} else {
			const newMetaColorScheme = document.createElement('meta');

			newMetaColorScheme.name = 'color-scheme';

			newMetaColorScheme.content = currentThemeMode;

			document.head.appendChild(newMetaColorScheme);
		}

		if (currentThemeMode === 'dark') {
			document.body.classList.add('dark');
			document.body.classList.remove('light');
		} else {
			document.body.classList.add('light');
			document.body.classList.remove('dark');
		}
	}, [currentThemeMode]);

	return <>{children}</>;
};

const MainLayout = ({ children }: IProps) => {
	return (
		<SharedMainStateProvider>
			<Layout>{children}</Layout>
		</SharedMainStateProvider>
	);
};

export default MainLayout;
