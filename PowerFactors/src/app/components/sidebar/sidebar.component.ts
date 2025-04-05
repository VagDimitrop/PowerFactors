import {Component} from '@angular/core';
import {WindowSizeService} from "../../services/windowSize/window-size.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems = [
    {icon: 'home', label: 'Home', route: '/home'},
    {icon: 'analytics', label: 'Data Table', route: '/table'},
    {icon: 'pie_chart', label: 'Chart', route: '/chart'}
  ];
  isMobile: boolean = false;

  constructor( private windowSizeService: WindowSizeService) {
  }
  ngOnInit() {
    this.windowSizeService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
}
