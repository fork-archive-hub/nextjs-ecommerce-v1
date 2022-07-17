import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { initialState } from './initialState';
import { reducer } from './reducer';

const useMyState = () => useReducer(reducer, initialState);

export const {
	Provider: SharedAdminDashboardStateProvider,
	useTracked: useSharedAdminDashboardState,
} = createContainer(useMyState);
