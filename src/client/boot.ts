// Angular
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';

// RxJS
import 'rxjs/Observable';

// Vendors
import 'chart.js/src/chart.js'
import '../public/reset.css';

import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {BootModule} from "./boot.module";

platformBrowserDynamic().bootstrapModule(BootModule);