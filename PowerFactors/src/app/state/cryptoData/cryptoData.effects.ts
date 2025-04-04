import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CryptoDataActions from './cryptoData.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CoinGeckoService } from '../../services/coingGecko/coinGecko.service';
import {Router} from "@angular/router";


@Injectable()
export class CryptoDataEffects {

  constructor(private actions$: Actions,
              private coinGeckoService : CoinGeckoService,
              private router: Router) {
  }

  loadCryptoData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CryptoDataActions.loadCryptoData),
      mergeMap(() =>
        this.coinGeckoService.fetchCryptoData().pipe(
          map((data) => CryptoDataActions.loadCryptoDataSuccess({ dataSource: data })),
          catchError(error => {
              this.router.navigate(['/error']);
              return of(CryptoDataActions.loadCryptoDataFailure({error}))
            }
          )
        )
      )
    )
  );
}
