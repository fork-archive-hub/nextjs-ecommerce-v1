// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { exampleRouter } from './example';
import { authRouter } from './auth';
import { productsRouter } from './products';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('example.', exampleRouter)
	.merge('auth.', authRouter)
	.merge('products.', productsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
