import Link from 'next/link';
import { ReactNode } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import Tooltip from '@components/common/Tooltip';
import { setIsSideMenuActive } from 'contexts/AdminDashboard/actions';
import { useSharedAdminDashboardState } from 'contexts/AdminDashboard';

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
		{ currentColorMode, isSideMenuActive, isClicked, screenSize },
		dispatch,
	] = useSharedAdminDashboardState();

	const handleToggleIsMenuActive = () =>
		setIsSideMenuActive(dispatch, !isSideMenuActive);
	return (
		<header className='flex justify-between w-full py-2 px-4'>
			<Link href='/'>logo</Link>
			<nav>
				<ul className='flex'>
					<li className='mx-2'>
						<NavButton
							title='Menu'
							customFunc={handleToggleIsMenuActive}
							color={currentColorMode}
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
