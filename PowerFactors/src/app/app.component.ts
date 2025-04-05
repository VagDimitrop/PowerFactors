import { Component } from '@angular/core';
import {WindowSizeService} from "./services/windowSize/window-size.service";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PowerFactors';
  isLoading: boolean = false;
  isMobile: boolean = false;

  constructor(private windowSizeService: WindowSizeService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
        // Subscribe to the isMobile$ observable from the service
    this.windowSizeService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
}
