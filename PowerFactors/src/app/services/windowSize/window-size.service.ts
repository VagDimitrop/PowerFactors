import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  private isMobileSubject = new BehaviorSubject<boolean>(window.innerWidth < 768); // Default value based on initial window size
  isMobile$ = this.isMobileSubject.asObservable();

  constructor() {
    // Add a listener for window resize events
    window.addEventListener('resize', this.onResize.bind(this));
  }

  private onResize(): void {
    const isMobile = window.innerWidth <= 768;
    this.isMobileSubject.next(isMobile); // Update the value for subscribers
  }
}
