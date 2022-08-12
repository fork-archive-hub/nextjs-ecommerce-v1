import { useEffect } from 'react';
import { isMobileOrTablet } from '@utils/device';
import { SharedMainStateProvider, useSharedMainState } from './context';
import {
	setCurrentBgColorMode,
	setCurrentFontColorMode,
	setIsMobileOrTablet,
	setThemeMode,
} from './context/actions';
import { useDynamicallyImportedGSAP } from './context/hooks';

interface IProps {
	children: JSX.Element;
}

const Layout = ({ children }: IProps) => {
	const [, dispatch] = useSharedMainState();

	// const { gsap } =
	useDynamicallyImportedGSAP();
	// console.log('gsap', gsap);

	// useEffect(() => {
	// 	// console.log('gsap', gsap);
	// 	if (gsap) {
	// 		(window as any).gsap = gsap;
	// 	}
	// }, [gsap]);
	useEffect(() => {
		const lsBgColorMode = localStorage.getItem('currentBgColorMode');
		const lsFontColorMode = localStorage.getItem('currentFontColorMode');
		const lsThemeMode = localStorage.getItem('currentThemeMode');

		if (lsBgColorMode) setCurrentBgColorMode(dispatch, lsBgColorMode);
		if (lsFontColorMode) setCurrentFontColorMode(dispatch, lsFontColorMode);
		if (lsThemeMode && (lsThemeMode == 'light' || lsThemeMode == 'dark'))
			setThemeMode(dispatch, lsThemeMode);
		else setThemeMode(dispatch, 'dark');
		setIsMobileOrTablet(dispatch, isMobileOrTablet());
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
