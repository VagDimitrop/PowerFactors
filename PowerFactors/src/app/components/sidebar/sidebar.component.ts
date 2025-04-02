import {Component} from '@angular/core';

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
}
