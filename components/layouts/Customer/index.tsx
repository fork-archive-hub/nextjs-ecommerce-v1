import { ReactNode } from 'react';
import { SharedCustomerStateProvider } from './context';
import MainNav from './MainNav';
import SideMenu from './SideMenu';

interface IProps {
	children: ReactNode;
}

const Layout = ({ children }: IProps) => {
	return (
		<>
			<MainNav />
			<SideMenu />
			<div className=' w-full mt-content-page overflow-x-hidden'>
				{/* max-h-full-content-page */}
				{children}
			</div>
		</>
	);
};

const CustomerLayout = ({ children }: IProps) => {
	return (
		<SharedCustomerStateProvider>
			<Layout>{children}</Layout>
		</SharedCustomerStateProvider>
	);
};

export default CustomerLayout;
