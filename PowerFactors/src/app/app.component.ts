import { Component } from '@angular/core';
import {WindowSizeService} from "./services/windowSize/window-size.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {selectCryptoDataLoading} from "./state/cryptoData/cryptoData.selectors";
import {ModalDialogComponent} from "./components/modal-dialog/modal-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PowerFactors';
  isMobile: boolean = false;
  loading$: Observable<boolean>
  loadingSubscription : Subscription | null = null;
  private dialogRef: any;

  constructor(private windowSizeService: WindowSizeService,
              private store: Store,
              private dialog: MatDialog) {
    this.loading$ = this.store.select(selectCryptoDataLoading);
  }

  ngOnInit(): void {
    this.loadingSubscription = this.loading$.subscribe(isLoading => {
      if (isLoading) {
        this.dialogRef = this.dialog.open(ModalDialogComponent);
      }
      else {
        this.dialog.closeAll();
        (document.activeElement as HTMLElement)?.blur();
      }
    })

    // Subscribe to the isMobile$ observable from the service
    this.windowSizeService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
}
