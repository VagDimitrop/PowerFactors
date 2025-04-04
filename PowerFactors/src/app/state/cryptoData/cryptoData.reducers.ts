import { createReducer, on } from '@ngrx/store';
import { CryptoData } from '../../services/types';
import * as CryptoDataActions from './cryptoData.actions';

export interface AppState {
  dataSource: CryptoData[];
  loading: boolean;
  error: any;
}

export const initialState: AppState = {
  dataSource: [],
  loading: false,
  error: null
};

export const cryptoDataReducer = createReducer(
  initialState,
  on(CryptoDataActions.loadCryptoData, state => ({
    ...state, loading: true
  })),
  on(CryptoDataActions.loadCryptoDataSuccess, (state, { dataSource }) => ({
    ...state, dataSource, loading: false
  })),
  on(CryptoDataActions.loadCryptoDataFailure, (state, { error }) => ({
    ...state, error, loading: false
  }))
);
