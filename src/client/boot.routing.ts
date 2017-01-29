import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './layout/content/content.component';
import {LinearComponent} from "./layout/content/linear/linear.component";

const routes: Routes = [
  { path: '', redirectTo: 'charts', pathMatch: 'full'},
  { path: 'charts', component: ContentComponent,
    children: [
      { path: '', redirectTo: 'linear', pathMatch: 'full' },
      { path: 'linear', component: LinearComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class BootRoutingModule { }