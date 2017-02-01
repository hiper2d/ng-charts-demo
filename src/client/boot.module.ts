import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import {BootRoutingModule} from "./boot.routing";
import {LayoutComponent} from "./layout/layout.component";
import {ContentComponent} from "./layout/content/content.component";
import {ChartjsComponent} from "./layout/content/chartjs/chartjs.component";
import {HighchartsComponent} from "./layout/content/highcharts/highcharts.component";
import {D3Component} from "./layout/content/d3/d3.component";
import {BarD3Component} from "./layout/content/d3/bar/bar.d3.component";
import {BarchartDirective} from "./directives/barchart.directive";


@NgModule({
    imports: [
        BootRoutingModule,
        BrowserModule,
        ChartsModule,
        HttpModule
    ],
    declarations: [
        BarD3Component,
        BarchartDirective,
        ChartjsComponent,
        ContentComponent,
        D3Component,
        HighchartsComponent,
        LayoutComponent
    ],
    bootstrap: [LayoutComponent],
})
export class BootModule { }
