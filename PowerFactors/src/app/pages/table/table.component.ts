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
import {Subscription} from "rxjs";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] =[];
  dataSource: MatTableDataSource<CryptoData>;
  dataToBeRendered: MatTableDataSource<CryptoData>;
  cryptoDataSubscription: Subscription | null = null;
  totalRecords: number = 0;
  pageSize: number = 20;
  pageIndex: number = 0;
  isMobile: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private coinGeckoService: CoinGeckoService,
              private appComponent: AppComponent,
              private windowSizeService: WindowSizeService,
              private router: Router) {
    this.dataSource = new MatTableDataSource<CryptoData>([]);
    this.dataToBeRendered = new MatTableDataSource<CryptoData>([]);
  }

  ngOnInit() {
    this.fetchCryptoData();
    this.windowSizeService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
      this.setDisplayedColumns();
    });
  }

  ngAfterViewInit() {
    this.dataToBeRendered.sort = this.sort;
  }

  ngOnDestroy() {
    this.cryptoDataSubscription?.unsubscribe()
  }

  fetchCryptoData() {
    this.cryptoDataSubscription = this.coinGeckoService.fetchCryptoData().subscribe({
      next: (data: CryptoData[]) => {
        this.dataSource.data = data;
        this.totalRecords = this.dataSource.data.length;
        this.updateDataToBeRendered();
      },
      error: (error: any) => {
        this.router.navigate(['/error']);
      }
    });
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
      behavior: 'smooth'});
  }

  setDisplayedColumns() {
    if (!this.isMobile) {
      this.displayedColumns = ['id', 'name', 'symbol', 'current_price', 'market_cap', 'total_volume', 'high_24h', 'low_24h', 'price_change_percentage_24h', 'circulating_supply'];
    } else {
      this.displayedColumns = ['name', 'symbol', 'current_price', 'price_change_percentage_24h'];
    }
  }
}
