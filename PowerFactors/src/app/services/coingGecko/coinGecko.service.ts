import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CryptoData } from '../types';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoinGeckoService {
  private apiUrl = 'https://api.coingecko.com/api/v3';
  private dialogRef: any;

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  openDialog(): void {
    this.dialogRef = this.dialog.open(ModalDialogComponent, {
      disableClose: true
    });
  }

  closeDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    (document.activeElement as HTMLElement)?.blur();
  }

  fetchCryptoData(): Observable<CryptoData[]> {
    return this.http.get<CryptoData[]>(`${this.apiUrl}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: '250',
        page: '1',
        sparkline: 'false'
      },
      headers: {'x-cgo-pro-api-key': 'CG-2k16PMqAJeUhcNRwNQ5TB7YQ'}
    })
  }
}
