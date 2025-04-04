import { createAction, props } from '@ngrx/store';
import { CryptoData } from '../../services/types';

export const loadCryptoData = createAction('[CryptoData] Load CryptoData');
export const loadCryptoDataSuccess = createAction('[CryptoData] Load CryptoData Success', props<{ dataSource: CryptoData[] }>());
export const loadCryptoDataFailure = createAction('[CryptoData] Load CryptoData Failure', props<{ error: any }>());
