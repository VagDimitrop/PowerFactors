import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoinGeckoService } from './coingGecko/coinGecko.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    CoinGeckoService
  ]
})
export class ServicesModule { }
