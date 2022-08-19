import Tooltip from '@components/common/Tooltip';
import { useSharedMainState } from '@components/layouts/Main/context';
import { setThemeMode } from '@components/layouts/Main/context/actions';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useSharedCustomerState } from '../context';
import { customerGlobalActions } from '../context/actions';

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
			className='relative text-xl rounded-full p-1 hover:bg-light-gray'
		>
			<span
				style={{ background: dotColor }}
				className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'
			/>
			{icon}
		</button>
	</Tooltip>
);

const MainNav = () => {
	const { data: session, status } = useSession();
	const [{ currentBgColorMode, currentThemeMode }, mainDispatch] =
		useSharedMainState();

	const [, customerDispatch] = useSharedCustomerState();

	return (
		<header className='h-main-nav-page z-10 bg-zinc-100 shadow-md shadow-slate-500 dark:bg-black dark:shadow-slate-800 fixed top-0 left-0 flex justify-between items-center w-full main-nav-page px-4'>
			<Link href='/'>logo</Link>
			<button
				className='hidden'
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
							title='Side Menu'
							customFunc={() =>
								customerGlobalActions.setIsVisibleOnly(
									customerDispatch,
									'sideNav'
								)
							}
							color={currentBgColorMode}
							icon={<AiOutlineMenu />}
						/>
					</li>
					<li className='mx-2'>
						{session ? (
							<button
								disabled={status !== 'authenticated'}
								type='button'
								onClick={() => status === 'authenticated' && signOut()}
							>
								Sign out
							</button>
						) : (
							<button
								disabled={status === 'loading'}
								type='button'
								onClick={() => status !== 'loading' && signIn()}
							>
								Sign in
							</button>
						)}
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNav;

/*

			<div className='w-full h-fit'>
				{status === 'loading' && <h1>Loading...</h1>}

				{session ? (
					<>
						Signed in as {session.user?.name} <br />
						{JSON.stringify(session, null, 2)} <br />
						<button type='button' onClick={() => signOut()}>
							Sign out
						</button>
					</>
				) : (
					<>
						Not signed in <br />
						<button type='button' onClick={() => signIn()}>
							Sign in
						</button>
					</>
				)}
			</div>
*/
