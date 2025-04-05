import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {TableComponent} from './pages/table/table.component';
import {ChartComponent} from "./pages/chart/chart.component";
import {ErrorPageComponent} from "./pages/error-page/error-page.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'table', component: TableComponent},
  {path: 'chart', component: ChartComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
