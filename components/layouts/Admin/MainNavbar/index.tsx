import Link from 'next/link';
import { ReactNode } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import Tooltip from '@components/common/Tooltip';
import { setIsSideMenuActive } from 'contexts/AdminDashboard/actions';
import { useSharedAdminDashboardState } from 'contexts/AdminDashboard';
import { useSharedMainState } from '@components/Layouts/Main/context';
import {
	setThemeMode,
} from '@components/Layouts/Main/context/actions';

const NavButton = ({
	title,
	customFunc,
	icon,
	color,
	dotColor,
}: {
	title: string;
	customFunc: () => void;
	icon: ReactNode;
	color: string;
	dotColor?: string;
}) => (
	<Tooltip content={title} position='bottomCenter'>
		<button
			type='button'
			onClick={() => customFunc()}
			style={{ color }}
			className='relative text-xl rounded-full p-3 hover:bg-light-gray'
		>
			<span
				style={{ background: dotColor }}
				className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'
			/>
			{icon}
		</button>
	</Tooltip>
);

const MainNavbar = () => {
	const [
		{
			isSideMenuActive,
			// isClicked,
			// screenSize,
		},
		adminDashboardDispatch,
	] = useSharedAdminDashboardState();
	const [{ currentBgColorMode, currentThemeMode }, mainDispatch] =
		useSharedMainState();

	const handleToggleIsMenuActive = () =>
		setIsSideMenuActive(adminDashboardDispatch, !isSideMenuActive);

	return (
		<header className='z-10 bg-slate-50 shadow-md shadow-slate-500 dark:bg-black dark:shadow-slate-800 fixed top-0 left-0 flex justify-between items-center w-full main-nav-page px-4'>
			<Link href='/'>logo</Link>
			<button
				onClick={() =>
					setThemeMode(
						mainDispatch,
						currentThemeMode === 'dark' ? 'light' : 'dark'
					)
				}
			>
				dark/light
			</button>
			<nav>
				<ul className='flex items-center'>
					<li className='mx-2'>
						<NavButton
							title='Menu'
							customFunc={handleToggleIsMenuActive}
							color={currentBgColorMode}
							icon={<AiOutlineMenu />}
						/>
					</li>
					<li className='mx-2'>2</li>
					<li className='mx-2'>3</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavbar;
