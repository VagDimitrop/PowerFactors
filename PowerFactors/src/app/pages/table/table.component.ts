import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ViewChild} from '@angular/core';
import {CryptoData} from '../../services/types';
import {CoinGeckoService} from '../../services/coingGecko/coinGecko.service';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'symbol', 'current_price', 'market_cap', 'total_volume', 'high_24h', 'low_24h', 'price_change_percentage_24h', 'circulating_supply'];
  dataSource: MatTableDataSource<CryptoData>;
  dataToBeRendered: MatTableDataSource<CryptoData>;
  isLoading: boolean = true;
  totalRecords: number = 0;
  pageSize: number = 20;
  pageIndex: number = 0;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private coinGeckoService: CoinGeckoService) {
    this.dataSource = new MatTableDataSource<CryptoData>([]);
    this.dataToBeRendered = new MatTableDataSource<CryptoData>([]);
  }

  ngOnInit() {
    this.fetchCryptoData();
  }

  ngAfterViewInit() {
    this.dataToBeRendered.sort = this.sort;
  }

  fetchCryptoData() {
    this.isLoading = true;
    this.coinGeckoService.fetchCryptoData().subscribe({
      next: (data: CryptoData[]) => {
        this.dataSource.data = data;
        this.totalRecords = this.dataSource.data.length;
        this.updateDataToBeRendered();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching crypto data:', error);
        this.isLoading = false;
      }
    });
  }

  updateDataToBeRendered() {
    this.dataToBeRendered.data = this.dataSource.data.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
    debugger;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
}
