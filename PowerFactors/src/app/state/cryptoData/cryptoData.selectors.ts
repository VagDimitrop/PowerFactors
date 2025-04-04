import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './cryptoData.reducers';

export const selectAppState = createFeatureSelector<AppState>('appState');

// Selector to get the dataSource (list of cryptocurrencies)
export const selectCryptoData = createSelector(
  selectAppState, // Start with the appState slice
  (state: AppState) => state.dataSource // Return the dataSource array
);

// Selector to check if the data is still loading
export const selectCryptoDataLoading = createSelector(
  selectAppState,
  (state: AppState) => state.loading
);

// Selector to get any errors (if present)
export const selectCryptoDataError = createSelector(
  selectAppState,
  (state: AppState) => state.error
);
