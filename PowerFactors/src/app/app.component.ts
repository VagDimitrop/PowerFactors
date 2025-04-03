import { Component } from '@angular/core';
import {WindowSizeService} from "./services/windowSize/window-size.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PowerFactors';
  isMobile: boolean = false;

  constructor(private windowSizeService: WindowSizeService) {}

  ngOnInit(): void {
    // Subscribe to the isMobile$ observable from the service
    this.windowSizeService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
}
