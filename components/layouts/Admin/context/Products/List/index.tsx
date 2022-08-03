import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { stateInit } from './initialState';
import { reducer } from './reducer';

const useMyState = () => useReducer(reducer, stateInit());

export const {
	Provider: SharedAdminDashboardProductsListStateProvider,
	useTracked: useSharedAdminDashboardProductsListState,
} = createContainer(useMyState);
