// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { exampleRouter } from './example';
import { authRouter } from './auth';
import { productsRouter } from './products';
import { adminProductsRouter } from './admin/products';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('example.', exampleRouter)
	.merge('auth.', authRouter)
	.merge('products.', productsRouter)
	.merge('admin.products.', adminProductsRouter);
// export type definition of API
export type AppRouter = typeof appRouter;
