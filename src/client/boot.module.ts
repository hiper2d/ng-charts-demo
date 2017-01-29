import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import {BootRoutingModule} from "./boot.routing";
import {LayoutComponent} from "./layout/layout.component";
import {ContentComponent} from "./layout/content/content.component";
import {LinearComponent} from "./layout/content/linear/linear.component";


@NgModule({
    imports: [
	      BootRoutingModule,
        BrowserModule,
        ChartsModule,
        HttpModule
    ],
    declarations: [
        ContentComponent,
        LayoutComponent,
        LinearComponent
    ],
    bootstrap: [LayoutComponent],
})
export class BootModule { }
