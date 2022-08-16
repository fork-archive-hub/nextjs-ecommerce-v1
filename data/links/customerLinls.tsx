const initCustomerLinks = ({ role }: { role?: string | null }) => [
	{
		title: `${
			role && role[0].toUpperCase() + role.slice(1).toLowerCase()
		} Dashboard`,
		isHidden: typeof role !== 'string' || !['ADMIN', 'SELLER'].includes(role),
		links: [
			{
				name: 'dashboard',
				path: 'dashboard',
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
