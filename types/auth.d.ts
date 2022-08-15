// import 'next-auth';

// declare module 'next-auth' {
// 	interface User {
// 		role: 'USER' | 'ADMIN'; // Or string
// 	}
// }

import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			role: 'ADMIN' | 'SELLER' | 'CUSTOMER' | null;
			createdAt: Date | string;
			id: string;
		} & DefaultSession['user'];
	}
}
