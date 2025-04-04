import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HomeComponent} from './pages/home/home.component';
import {TableComponent} from './pages/table/table.component';
import {ServicesModule} from './services/services.module';
import {ChartComponent} from './pages/chart/chart.component';
import {HighchartsChartModule} from "highcharts-angular";
import {ModalDialogComponent} from './components/modal-dialog/modal-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ErrorPageComponent} from './pages/error-page/error-page.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {cryptoDataReducer, AppState} from './state/cryptoData/cryptoData.reducers'
import {CryptoDataEffects} from "./state/cryptoData/cryptoData.effects";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    TableComponent,
    ChartComponent,
    ModalDialogComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServicesModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    HighchartsChartModule,
    MatDialogModule,
    StoreModule.forRoot({appState: cryptoDataReducer}),
    EffectsModule.forRoot([CryptoDataEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
