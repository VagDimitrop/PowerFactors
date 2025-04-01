import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CryptoData } from '../types';

@Injectable({
  providedIn: 'root'
})
export class CoinGeckoService {
  private apiUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) { }

  fetchCryptoData(): Observable<CryptoData[]> {
    return this.http.get<CryptoData[]>(`${this.apiUrl}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: '250',
        page: '1',
        sparkline: 'false'
      }
    });
  }
}
