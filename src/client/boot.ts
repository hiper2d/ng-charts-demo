import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';

// Angular
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';

// RxJS
import 'rxjs/Observable';

import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {BootModule} from "./boot.module";

Error['stackTraceLimit'] = Infinity;
platformBrowserDynamic().bootstrapModule(BootModule);