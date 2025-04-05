import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {CoinGeckoService} from "../../services/coingGecko/coinGecko.service";
import {MatTableDataSource} from "@angular/material/table";
import {CategoryData, CryptoData} from "../../services/types";
import {AppComponent} from "../../app.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  dataSource: MatTableDataSource<CryptoData>;
  seriesData: CategoryData[] = [];
  cryptoDataSubscription: Subscription | null = null;
  chartSize: number = 10;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Market Cap Distribution Pie Chart',
      style: {
        color: '#18230F',
        textAlign: 'center'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
      }
    },
    series: [{
      name: 'Price',
      type: 'pie',
      data: [],
      dataLabels: {
        style: {
          color: '#255F38',  // Set the font color of the labels (black in this case)
          fontSize: '14px',  // Optional: Set the font size
          fontWeight: 'bold',  // Optional: Set the font weight
        }
      }
    }]
  };
  Highcharts = Highcharts;

  constructor(private coinGeckoService: CoinGeckoService, private appComponent: AppComponent) {
    this.dataSource = new MatTableDataSource<CryptoData>([]);
  }

  ngOnInit() {
    this.fetchCryptoData();
  }

  fetchCryptoData() {
    this.appComponent.isLoading = true;
    this.coinGeckoService.fetchCryptoData().subscribe({
      next: (data: CryptoData[]) => {
        this.dataSource.data = data;
        this.setUpChartOptions(this.chartSize);
        this.appComponent.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching crypto data:', error);
        this.appComponent.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    this.cryptoDataSubscription?.unsubscribe()
  }


  setUpChartOptions(numberOfEntries: number) {
    if (this.dataSource.data && this.dataSource.data.length > 0) {
      this.seriesData = [];  // Clear existing series data

      for (let i = 0; i < numberOfEntries && i < this.dataSource.data.length; i++) {
        const crypto = this.dataSource.data[i];
        this.seriesData.push({
          name: crypto.name,
          y: crypto.market_cap,
          current_price: crypto.current_price,
          volume24h: crypto.total_volume,
          priceChange24h: crypto.price_change_percentage_24h,
          rank: crypto.market_cap_rank
        });
      }

      // Create a new options object to ensure proper update
      this.chartOptions = {
        ...this.chartOptions,
        series: [{
          name: 'Price',
          type: 'pie',
          data: this.seriesData,
          dataLabels: {
            enabled: true,
            format: '{point.name}: ${point.y:,.2f}'
          },
          tooltip: {
            headerFormat: '<span style="text-align: center"><b>{point.name}</b></span><br/>',
            pointFormatter: function() {
              const point = this as any;
              return `
                <div>
                    <span><b>Price: </b>$${Highcharts.numberFormat(point.current_price, 2)}</span> <br>
                    <span><b>24h Volume: </b>$${Highcharts.numberFormat(point.volume24h, 0)}</span> <br>
                    <span><b>24h Change: </b>
                        <span style="color: ${point.priceChange24h >= 0 ? '#4caf50' : '#f44336'}">
                       ${point.priceChange24h.toFixed(2)}%
                        </span>
                    </span> <br>
                </div>
              `;
            }
          }
        }]
      };
    }
  }
}
