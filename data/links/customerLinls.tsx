const initCustomerLinks = (isAdmin: boolean) => [
	{
		title: 'Admin Dashboard',
		isHidden: isAdmin,
		links: [
			{
				name: 'admin',
				path: 'admin',
				icon: null,
			},
		],
	},
	{
		title: 'Pages',
		links: [
			// {
			// 	name: 'customers',
			// 	path: 'customers',
			// 	icon: null,
			// },
			{
				name: 'contact us',
				path: 'contactUs',
				icon: null,
			},
			{
				name: 'about us',
				path: 'aboutUs',
				icon: null,
			},
		],
	},
];

export default initCustomerLinks;
