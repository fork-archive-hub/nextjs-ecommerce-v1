import { useSharedMainState } from '@components/layouts/Main/context';
import initCustomerLinks from 'data/links/customerLinls';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSharedCustomerState } from '../context';
import { customerGlobalActions } from '../context/actions';

const SideMenu = () => {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [{ currentBgColorMode, currentFontColorMode }] = useSharedMainState();
	const [{ isVisible }, customerDispatch] = useSharedCustomerState();

	const activeLink =
		'flex items-center gap-5 pl-4 pt-3 p-3 rounded-lg  text-zinc-100  text-md m-2';
	const normalLink = `
  flex
  items-center
  gap-5
  pl-4
  pt-3
  p-3
  rounded-lg
  text-md
  text-gray-700
  dark:text-gray-200
  dark:hover:text-gray-500
  hover:bg-light-gray m-2
  `;

	const customerLinks = initCustomerLinks({
		role: session?.user.role || null,
	});

	if (!isVisible.sideNav) return <> </>;

	return (
		<>
			<div
				className='fixed z-[9] top-0 left-0 h-full-content-page mt-content-page w-full bg-half-transparent'
				onClick={() =>
					customerGlobalActions.setIsVisibleOnly(customerDispatch, 'sideNav')
				}
			/>
			<nav className='fixed z-10 top-0 left-0 h-full-content-page mt-content-page bg-zinc-100 dark:bg-black'>
				<ul>
					{customerLinks.map((item) =>
						!!item.isHidden ? (
							<></>
						) : (
							<div key={item.title}>
								<p className='text-gray-800 dark:text-gray-400 m-3 mt-4 uppercase'>
									<strong className='font-bold'>{item.title}</strong>
								</p>
								{item.links.map((link) => {
									// const linkName = link.path;
									const isActive = router.pathname.startsWith(link.path);
									return (
										<Link href={link.path} key={link.path}>
											<a
												onClick={() => {}}
												style={{
													backgroundColor: isActive ? currentBgColorMode : '',
													color: isActive ? currentFontColorMode : '',
												}}
												className={isActive ? activeLink : normalLink}
											>
												{/* <span class='inline'>{link.icon} </span> */}
												{link.icon && <>{link.icon} </>}
												<span className='capitalize '>{link.name}</span>
											</a>
										</Link>
									);
								})}
							</div>
						)
					)}
				</ul>
			</nav>
		</>
	);
};

export default SideMenu;
