import type { TInitialState } from './ts';

export const stateInit = (): TInitialState => ({
	list: {
		data: [],
		page: { index: 0, orderBy: { by: 'createdAt', dir: 'ASC' }, limit: 10 },
		orderBy: { by: 'createdAt', dir: 'ASC' },
	},
	added: { data: [] },
	removed: { data: [] },
});
