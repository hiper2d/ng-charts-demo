import {Component, ElementRef, OnChanges, OnInit, ViewChild} from "@angular/core";
import * as d3 from "d3";

// D3 tutorials https://github.com/d3/d3/wiki/Tutorials

// Stacked Grouped Bar Charts examples:
// http://stackoverflow.com/questions/36770503/grouped-multiple-stacked-bar-chart
// http://bl.ocks.org/gencay/4629518

//todo: make svg responsive

@Component({
    selector: '.d3',
    templateUrl: './d3.component.html',
    styleUrls: ['./d3.component.scss']
})
export class D3Component implements OnInit {

    ngOnInit(): void {
    }
}