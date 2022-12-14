import Tooltip from '@components/common/Tooltip';
import { useSharedDashboardDashboardState } from '@components/layouts/Dashboard/context';
import { setIsSideMenuActive } from '@components/layouts/Dashboard/context/actions';
import { SiShopware } from 'react-icons/si';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdOutlineCancel } from 'react-icons/md';
import {
	// AiOutlineCalendar,
	AiOutlineShoppingCart,
} from 'react-icons/ai';
import {
	FiShoppingBag,
	// FiEdit,
	// FiPieChart,
	// FiBarChart,
	// FiCreditCard,
	// FiStar,
	// FiShoppingCart,
} from 'react-icons/fi';
// import {
// 	BsKanban,
// 	BsBarChart,
// 	BsBoxSeam,
// 	BsCurrencyDollar,
// 	BsShield,
// 	BsChatLeft,
// } from 'react-icons/bs';
// import { BiColorFill } from 'react-icons/bi';
// import { IoMdContacts } from 'react-icons/io';
import {
	RiContactsLine,
	// RiStockLine
} from 'react-icons/ri';
import { useSharedMainState } from '@components/layouts/Main/context';

const SideMenu = () => {
	const router = useRouter();
	const [{ isSideMenuActive, screenSize }, dispatch] =
		useSharedDashboardDashboardState();
	const [{ currentBgColorMode, currentFontColorMode }] = useSharedMainState();

	const handleCloseSideBar = () => {
		if (screenSize !== undefined && screenSize <= 900) {
			setIsSideMenuActive(dispatch, false);
		}
	};

	const links: {
		title: string;
		links: {
			name: string;
			path?: string;
			icon: JSX.Element;
		}[];
	}[] = [
		{
			title: 'Dashboard',
			links: [
				{
					name: 'ecommerce',
					path: '/dashboard',
					icon: <></>,
				},
			],
		},

		{
			title: 'Pages',
			links: [
				// {
				// 	name: 'customers',
				// 	path: '/dashboard/customers',
				// 	icon: <RiContactsLine />,
				// },
				// {
				// 	name: 'orders',
				// 	path: '/dashboard/orders',
				// 	icon: <AiOutlineShoppingCart />,
				// },
				{
					name: 'stores',
					path: '/dashboard/stores',
					icon: <FiShoppingBag />,
				},
				// {
				// 	name: 'employees',
				// 	icon: <IoMdContacts />,
				// },
			],
		},
	];

	const activeLink =
		'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-zinc-100  text-md m-2';
	const normalLink = `
  flex
  items-center
  gap-5
  pl-4
  pt-3
  pb-2.5
  rounded-lg
  text-md
  text-gray-700
  dark:text-gray-200
  dark:hover:text-gray-500
  hover:bg-light-gray m-2
  `;

	if (!isSideMenuActive) return <></>;

	return (
		<>
			<div className='pb-10 h-screen overflow-auto md:overflow-hidden md:hover:overflow-auto md:focus-within:overflow-auto md:focus:overflow-auto sidebar min-w-48'>
				{' '}
				{/* w-72 min-w-max */}
				{/* <div className='w-72 sidebar'> */}
				{/* fixed dark:bg-secondary-dark-bg bg-zinc-100 */}
				{/* {isSideMenuActive && (
					<> */}
				<div className='flex justify-between items-center'>
					<Link href='/'>
						<a
							onClick={handleCloseSideBar}
							className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-zinc-100 text-slate-900'
						>
							<SiShopware /> <span>The Treeda</span>
						</a>
					</Link>
					<span className='mx-1' />
					<Tooltip content='Menu' position='bottomCenter'>
						<button
							type='button'
							onClick={() => setIsSideMenuActive(dispatch, !isSideMenuActive)}
							style={{
								color: currentBgColorMode,
								backgroundColor: currentFontColorMode,
							}}
							className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'
						>
							<MdOutlineCancel />
						</button>
					</Tooltip>
				</div>
				<div className='mt-10'>
					{links.map((item) => (
						<div key={item.title}>
							<p className='text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase'>
								<strong className='font-bold'>{item.title}</strong>
							</p>
							{item.links.map((link) => {
								const linkName = link.path
									? link.path
									: `/dashboard/${link.name}`;
								const isActive = router.pathname.startsWith(linkName);
								return (
									<Link href={linkName} key={linkName}>
										<a
											onClick={handleCloseSideBar}
											style={{
												backgroundColor: isActive ? currentBgColorMode : '',
												color: isActive ? currentFontColorMode : '',
											}}
											className={isActive ? activeLink : normalLink}
										>
											{/* <span class='inline'>{link.icon} </span> */}
											{link.icon}{' '}
											<span className='capitalize '>{link.name}</span>
										</a>
									</Link>
								);
							})}
						</div>
					))}
				</div>
				{/* </>
				)} */}
			</div>
			<div className='p-0.5 bg-gray-500' />
		</>
	);
};

export default SideMenu;
