import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './layout/content/content.component';
import {ChartjsComponent} from "./layout/content/chartjs/chartjs.component";
import {HighchartsComponent} from "./layout/content/highcharts/highcharts.component";
import {D3Component} from "./layout/content/d3/d3.component";

const routes: Routes = [
  { path: '', redirectTo: 'charts', pathMatch: 'full'},
  { path: 'charts', component: ContentComponent,
    children: [
      { path: '', redirectTo: 'd3', pathMatch: 'full' },
      { path: 'd3', component: D3Component },
      { path: 'chartjs', component: ChartjsComponent },
      { path: 'highcharts', component: HighchartsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class BootRoutingModule { }