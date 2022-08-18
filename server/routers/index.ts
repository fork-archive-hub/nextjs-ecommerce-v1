// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { productsRouter } from './products';
import { adminProductsRouter } from './admin/products';
import { userProfileRouter } from './users/profile';
import { storesRouter } from './stores';
import { storeProductsRouter } from './stores/products';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('products.', productsRouter)
	.merge('user.profile.', userProfileRouter)
	.merge('admin.products.', adminProductsRouter)
	.merge('stores.', storesRouter)
	.merge('stores.products.', storeProductsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
