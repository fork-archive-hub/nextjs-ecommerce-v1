import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import {
	// AiOutlineCalendar,
	AiOutlineShoppingCart,
	// AiOutlineAreaChart,
	// AiOutlineBarChart,
	// AiOutlineStock,
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
// import { MdOutlineSupervisorAccount } from 'react-icons/md';
// import { HiOutlineRefresh } from 'react-icons/hi';
// import { TiTick } from 'react-icons/ti';
// import { GiLouvrePyramid } from 'react-icons/gi';
// import { GrLocation } from 'react-icons/gr';

type Props = {};

const SideNavbar = () => {
	const router = useRouter();
	const [isActive, setIsActive] = useState(true);
	const currentColorMode = '#03C9D7';

	const handleCloseSideBar = () => setIsActive((prev) => !prev);

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

	return (
		<div className='px-2 pb-10 h-screen  overflow-auto md:overflow-hidden md:hover:overflow-auto md:focus-within:overflow-auto md:focus:overflow-auto'>
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
									{link.icon} <span className='capitalize '>{link.name}</span>
								</a>
							</Link>
						);
					})}
				</div>
			))}
		</div>
	);
};

const AdminLayout = ({ children }: { children: ReactNode }) => {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'loading' || status === 'unauthenticated') return;
		if (!session?.user || session?.user.role !== 'ADMIN') {
			router.push('/');
		}
	}, [router, session?.user, session?.user.role, status]);

	if (status === 'loading') return <>Loading...</>;

	return (
		<>
			<header className='flex justify-between w-full py-2 px-4'>
				<Link href='/'>logo</Link>
				<nav>
					<ul className='flex'>
						<li className='mx-2'>1</li>
						<li className='mx-2'>2</li>
						<li className='mx-2'>3</li>
					</ul>
				</nav>
			</header>
			<div className='flex'>
				<SideNavbar />
				<div className='p-0.5 bg-gray-500' />
				{children}
			</div>
		</>
	);
};

export default AdminLayout;
