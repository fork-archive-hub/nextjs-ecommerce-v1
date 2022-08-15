// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { exampleRouter } from './example';
import { authRouter } from './auth';
import { productsRouter } from './products';
import { adminProductsRouter } from './admin/products';
import { userProfileRouter } from './users/profile';
import { storesRouter } from './stores';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('example.', exampleRouter)
	.merge('auth.', authRouter)
	.merge('products.', productsRouter)
	.merge('user.profile.', userProfileRouter)
	.merge('admin.products.', adminProductsRouter)
	.merge('stores.', storesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
