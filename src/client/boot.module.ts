import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import {BootRoutingModule} from "./boot.routing";
import {LayoutComponent} from "./layout/layout.component";
import {ContentComponent} from "./layout/content/content.component";

@NgModule({
    imports: [
	      BootRoutingModule,
        BrowserModule,
        HttpModule
    ],
    declarations: [LayoutComponent, ContentComponent],
    bootstrap: [LayoutComponent],
})
export class BootModule { }
