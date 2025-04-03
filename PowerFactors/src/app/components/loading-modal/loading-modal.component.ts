import { Component } from '@angular/core';
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.scss']
})
export class LoadingModalComponent {
  isLoading: boolean = false;

  constructor(private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.isLoading = this.appComponent.isLoading
  }
}
