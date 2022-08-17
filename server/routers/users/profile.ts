import { createRouter } from '../context';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const userProfileRouter = createRouter()
	.middleware(async ({ ctx, next }) => {
		if (!ctx.session?.user || ctx.session.user.role)
			throw new TRPCError({ code: 'FORBIDDEN' });

		return next();
	})
	.mutation('completeSellerProfileData', {
		input: z.object({
			// role: z.string(),
			roleData: z.object({
				name: z.string(),
				bio: z.string(),
			}),
		}),
		resolve: async ({ ctx, input }) => {
			const userId = ctx.session?.user.id as string;

			const userRoleUpdated = await ctx.prisma.user.update({
				data: { role: 'SELLER', updatedAt: new Date() },
				where: { id: userId },
				select: { id: true, role: true },
			});

			const sellerProfileCreate = await ctx.prisma.seller.create({
				data: {
					name: input.roleData.name,
					bio: input.roleData.bio,
					userId: userRoleUpdated.id,
					updatedAt: new Date(),
				},
			});

			return { role: 'SELLER' };
		},
	})
	.mutation('completeCustomerProfileData', {
		input: z.object({
			// role: z.string(),
			roleData: z.object({
				firstName: z.string(),
				secondName: z.string(),
				bio: z.string(),
				sex: z.string(),
				dateOfBirth: z.date(),
			}),
		}),
		resolve: async ({ ctx, input }) => {
			const userId = ctx.session?.user.id as string;

			const userRoleUpdated = await ctx.prisma.user.update({
				data: { role: 'CUSTOMER', updatedAt: new Date() },
				where: { id: userId },
				select: { id: true, role: true },
			});

			const customerProfileCreate = await ctx.prisma.customer.create({
				data: {
					firstName: input.roleData.firstName,
					secondName: input.roleData.secondName,
					bio: input.roleData.bio,
					sex: input.roleData.sex,
					dateOfBirth: input.roleData.dateOfBirth,

					userId: userRoleUpdated.id,
					updatedAt: new Date(),
				},
			});

			return { role: 'CUSTOMER' };
		},
	});
