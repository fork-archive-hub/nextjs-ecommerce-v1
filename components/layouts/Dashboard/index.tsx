// import Tooltip from '@components/common/Tooltip';
import {
	SharedDashboardDashboardStateProvider,
	useSharedDashboardDashboardState,
} from './context';
import { setIsSideMenuActive, setScreenSize } from './context/actions';
// import { SiShopware } from 'react-icons/si';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
// import { MdOutlineCancel } from 'react-icons/md';
import { useSession } from 'next-auth/react';
// import {
// 	// AiOutlineCalendar,
// 	AiOutlineShoppingCart,
// 	// AiOutlineAreaChart,
// 	// AiOutlineBarChart,
// 	// AiOutlineStock,
// } from 'react-icons/ai';
// import {
// 	FiShoppingBag,
// 	// FiEdit,
// 	// FiPieChart,
// 	// FiBarChart,
// 	// FiCreditCard,
// 	// FiStar,
// 	// FiShoppingCart,
// } from 'react-icons/fi';
import MainNavbar from './MainNavbar';
import SideMenu from './SideMenu';
import { useSharedMainState } from '../Main/context';
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
// import {
// 	RiContactsLine,
// 	// RiStockLine
// } from 'react-icons/ri';
// import { MdOutlineSupervisorAccount } from 'react-icons/md';
// import { HiOutlineRefresh } from 'react-icons/hi';
// import { TiTick } from 'react-icons/ti';
// import { GiLouvrePyramid } from 'react-icons/gi';
// import { GrLocation } from 'react-icons/gr';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [
		{
			// isSideMenuActive,
			// currentThemeMode,
			screenSize,
			// isClicked
		},
		dispatch,
	] = useSharedDashboardDashboardState();

	// const handleToggleIsMenuActive = () =>
	// 	setIsSideMenuActive(dispatch, !isSideMenuActive);

	useEffect(() => {
		if (status === 'loading') return;
		if (
			status === 'unauthenticated' ||
			!session?.user ||
			!session?.user.role ||
			// typeof session?.user?.role !== 'srting' ||
			!['ADMIN', 'SELLER'].includes(session.user.role)
		) {
			router.push('/');
		}
	}, [router, session?.user, session?.user.role, status]);

	useEffect(() => {
		const handleResize = () => setScreenSize(dispatch, window.innerWidth);

		window.addEventListener('resize', handleResize);

		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, [dispatch]);

	useEffect(() => {
		if (screenSize && screenSize <= 900) {
			setIsSideMenuActive(dispatch, false);
		} else {
			setIsSideMenuActive(dispatch, true);
		}
	}, [dispatch, screenSize]);

	if (status === 'loading') return <>Loading...</>;

	return (
		<>
			<MainNavbar />
			<div className='flex w-full min-h-full-content-page mt-content-page overflow-hidden'>
				<SideMenu />
				{children}
			</div>
		</>
	);
};

const DashboardLayoutWithContext = ({ children }: { children: ReactNode }) => {
	return (
		<SharedDashboardDashboardStateProvider>
			<DashboardLayout>{children}</DashboardLayout>
		</SharedDashboardDashboardStateProvider>
	);
};

export default DashboardLayoutWithContext;
