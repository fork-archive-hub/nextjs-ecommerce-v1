import NextAuth, { type NextAuthOptions } from 'next-auth';
// import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials';

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../server/db/client';

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prisma),
	secret: process.env.SECRET,
	providers: [
		// GithubProvider({
		// 	clientId: process.env.GITHUB_ID as string,
		// 	clientSecret: process.env.GITHUB_SECRET as string,
		// }),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
		}),
		// // ...add more providers here
		// CredentialsProvider({
		//   name: "Credentials",
		//   credentials: {
		//     name: {
		//       label: "Name",
		//       type: "text",
		//       placeholder: "Enter your name",
		//     },
		//   },
		//   async authorize(credentials, _req) {
		//     const user = { id: 1, name: credentials?.name ?? "J Smith" };
		//     return user;
		//   },
		// }),
	],
	callbacks: {
		/*
		jwt: async ({ token, user }) => {
			if (user) {
				const profileData = await prisma.user.findUnique({
					where: {
						id: user.id,
					},
					select: {
						bio: true,
					},
				});

				(user as typeof user & { bio?: string | null }).bio = profileData?.bio;
			}

			// token.userRole = 'admin';

			console.log('user', user);
			return Promise.resolve(token);
		},
		session: async ({ session, user }) => {
			return Promise.resolve(session);
		},
		*/
		session: async ({ session, token, user }) => {
			// if (user?.id) {
			// 	const profileData = await prisma.user.findUnique({
			// 		where: {
			// 			id: user.id,
			// 		},
			// 		select: {
			// 			bio: true,
			// 		},
			// 	});

			// 	(session as unknown as any).user.bio = profileData?.bio;
			// 	// (user as typeof user & { bio?: string | null })
			// }

			if (
				'createdAt' in user &&
				'role' in user &&
				(user.role === 'ADMIN' || user.role === 'USER')
			) {
				session.user.role = user.role;
				session.user.createdAt =
					user.createdAt as typeof session.user.createdAt;
				// (user as typeof user & { bio?: string | null })
			}

			console.log('session', session);
			console.log('token', token);
			console.log('user', user);
			return session;
		},
		jwt: async ({ token, user, account, profile, isNewUser }) => {
			console.log('token', token);
			return token;
		},
	},
};

export default NextAuth(authOptions);

/*
import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import GitHubProvider from 'next-auth/providers/github';
// import EmailProvider from 'next-auth/providers/email';
import prisma from '@libs/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
	providers: [
		// GitHubProvider({
		// 	clientId: process.env.GITHUB_ID,
		// 	clientSecret: process.env.GITHUB_SECRET,
		// }),
		// EmailProvider({
		// 	server: {
		// 		host: process.env.SMTP_HOST,
		// 		port: Number(process.env.SMTP_PORT),
		// 		auth: {
		// 			user: process.env.SMTP_USER,
		// 			pass: process.env.SMTP_PASSWORD,
		// 		},
		// 	},
		// 	from: process.env.SMTP_FROM,
		// }),
	],
	adapter: PrismaAdapter(prisma),
	secret: process.env.SECRET,
};

*/
