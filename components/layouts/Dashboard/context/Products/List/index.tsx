import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { stateInit } from './initialState';
import { reducer } from './reducer';

const useMyState = () => useReducer(reducer, stateInit());

export const {
	Provider: SharedDashboardDashboardProductsListStateProvider,
	useTracked: useSharedDashboardDashboardProductsListState,
} = createContainer(useMyState);
