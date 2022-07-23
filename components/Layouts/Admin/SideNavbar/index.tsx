import Tooltip from '@components/common/Tooltip';
import { useSharedAdminDashboardState } from 'contexts/AdminDashboard';
import { setIsSideMenuActive } from 'contexts/AdminDashboard/actions';
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

const SideNavbar = () => {
	const router = useRouter();
	// const [isActive, setIsActive] = useState(true);
	// const currentColorMode = '#03C9D7';
	const [{ currentColorMode, isSideMenuActive, screenSize }, dispatch] =
		useSharedAdminDashboardState();

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
					icon: <></>,
				},
			],
		},

		{
			title: 'Pages',
			links: [
				{
					name: 'customers',
					icon: <RiContactsLine />,
				},
				{
					name: 'orders',
					icon: <AiOutlineShoppingCart />,
				},
				{
					name: 'products',
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
		'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
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
			<div className='px-2 pb-10 h-screen  overflow-auto md:overflow-hidden md:hover:overflow-auto md:focus-within:overflow-auto md:focus:overflow-auto w-72 min-w-fit sidebar'>
				{/* <div className='w-72 sidebar'> */}
				{/* fixed dark:bg-secondary-dark-bg bg-white */}
				{/* {isSideMenuActive && (
					<> */}
				<div className='flex justify-between items-center'>
					<Link href='/'>
						<a
							onClick={handleCloseSideBar}
							className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900'
						>
							<SiShopware /> <span>Shoppy</span>
						</a>
					</Link>
					<Tooltip content='Menu' position='bottomCenter'>
						<button
							type='button'
							onClick={() => setIsSideMenuActive(dispatch, !isSideMenuActive)}
							style={{ color: currentColorMode }}
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
								{item.title}
							</p>
							{item.links.map((link) => {
								const linkName = link.path ? link.path : `/admin/${link.name}`;
								const isActive = router.pathname.startsWith(linkName);
								return (
									<Link href={linkName} key={linkName}>
										<a
											onClick={handleCloseSideBar}
											style={{
												backgroundColor: isActive ? currentColorMode : '',
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

export default SideNavbar;
