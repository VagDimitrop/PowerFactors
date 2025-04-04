import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ViewChild} from '@angular/core';
import {CryptoData} from '../../services/types';
import {CoinGeckoService} from '../../services/coingGecko/coinGecko.service';
import {PageEvent} from "@angular/material/paginator";
import {AppComponent} from "../../app.component";
import {WindowSizeService} from "../../services/windowSize/window-size.service";
import {Router} from "@angular/router";
import {map, Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {
  selectCryptoData,
  selectCryptoDataError,
  selectCryptoDataLoading
} from "../../state/cryptoData/cryptoData.selectors";
import * as CryptoDataActions from '../../state/cryptoData/cryptoData.actions'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  cryptoData$: Observable<CryptoData[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  cryptoDataSubscription: Subscription | null = null;
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<CryptoData>;
  dataToBeRendered: MatTableDataSource<CryptoData>;

  pageSize: number = 20;
  pageIndex: number = 0;
  totalRecords: number = 0;

  isMobile: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private coinGeckoService: CoinGeckoService,
              private appComponent: AppComponent,
              private windowSizeService: WindowSizeService,
              private router: Router,
              private store: Store) {
    this.cryptoData$ = this.store.select(selectCryptoData).pipe(
      map(data => data ?? []));
    this.loading$ = this.store.select(selectCryptoDataLoading);
    this.error$ = this.store.select(selectCryptoDataError);

    this.dataSource = new MatTableDataSource<CryptoData>([]);
    this.dataToBeRendered = new MatTableDataSource<CryptoData>([]);
  }

  ngOnInit(): void {
    this.store.dispatch(CryptoDataActions.loadCryptoData());

    this.cryptoDataSubscription = this.cryptoData$.subscribe(data => {
      this.dataSource.data = data;
      this.totalRecords = this.dataSource.data.length;
      this.updateDataToBeRendered();
    });

    this.windowSizeService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });

    this.setDisplayedColumns();
  }

  ngAfterViewInit() {
    this.dataToBeRendered.sort = this.sort;
  }

  ngOnDestroy() {
    this.cryptoDataSubscription?.unsubscribe()
  }

  updateDataToBeRendered() {
    this.dataToBeRendered.data = this.dataSource.data.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataToBeRendered.filter = filterValue.trim().toLowerCase();
  }

  searchDataSet(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    if (searchValue !== '') {
      this.dataSource.filter = searchValue.trim().toLowerCase();
      this.dataToBeRendered.data = this.dataSource.data.filter(element =>
        element.name.toLowerCase().includes(searchValue)
      );
    } else {
      this.updateDataToBeRendered();
    }
  }

  formatNumber(num: number, currency: string): string {
    if (currency) {
      // Format as currency with the given currency symbol or code
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(num);
    } else {
      // Format as a regular number with 2 decimal places
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(num);
    }
  }

  pageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    // Reload data based on the current page index and page size
    this.updateDataToBeRendered();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  setDisplayedColumns() {
    if (!this.isMobile) {
      this.displayedColumns = ['id', 'name', 'symbol', 'current_price', 'market_cap', 'total_volume', 'high_24h', 'low_24h', 'price_change_percentage_24h', 'circulating_supply'];
    } else {
      this.displayedColumns = ['name', 'symbol', 'current_price', 'price_change_percentage_24h'];
    }
  }
}
