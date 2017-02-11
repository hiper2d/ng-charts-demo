import {Component, ElementRef, OnChanges, OnInit, ViewChild} from "@angular/core";

import {D3, D3Service, Selection} from 'd3-ng2-service';
import {DSVParsedArray} from "d3-dsv";

@Component({
	selector: '.d3bar',
	template: '<svg></svg>',
	styleUrls: ['bar.d3.component.scss']
})
export class BarD3Component implements OnInit, OnChanges {
	private data: any;
	private margin: any = {top: 40, bottom: 40, left: 40, right: 40};
	private parentNativeElement: any;
	private d3: D3;
	private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
	
	constructor(private element: ElementRef, private _d3Service: D3Service) {
		this.parentNativeElement = element.nativeElement;
		this.d3 = _d3Service.getD3();
	}
	
	ngOnInit() {
		let d3: D3 = this.d3;
		this.data = require('./data.csv');
		let svgParentElement: Selection<HTMLElement, any, null, undefined>;
		let d3G: Selection<SVGGElement, any, null, undefined>;
		
		if (this.parentNativeElement !== null) {
			svgParentElement = d3.select(this.parentNativeElement);
			this.d3Svg = svgParentElement.select<SVGSVGElement>('svg');
			
			let width = this.parentNativeElement.offsetWidth - this.margin.left - this.margin.right;
			let height = this.parentNativeElement.offsetHeight - this.margin.top - this.margin.bottom;
			this.d3Svg.attr('viewBox', '0 0 ' + this.parentNativeElement.offsetWidth + ' ' + this.parentNativeElement.offsetHeight)
			this.d3Svg.attr('preserveAspectRatio', 'xMinYMin');
			
			d3G = this.d3Svg.append<SVGGElement>('g');
			d3G.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
			
			let parsedData: DSVParsedArray<any> = d3.csvParse(this.data);
			let keys = parsedData.columns.slice(1);
			//console.log(parsedData);
			
			let x0 = d3.scaleBand()
				.domain(parsedData.map(d => d.State))
				.rangeRound([0, width])
				.paddingInner(0.1);
			let x1 = d3.scaleBand()
				.domain(keys)
				.rangeRound([0, x0.bandwidth()])
				.padding(0.05);
			let y = d3.scaleLinear()
				.domain([0, d3.max(parsedData, d => d3.max(keys, key => +d[key]))])
				.nice()
				.rangeRound([height, 0]);
			let colors = d3.scaleOrdinal().range([
				"#98abc5",
				"#8a89a6",
				"#7b6888",
				"#6b486b",
				"#a05d56",
				"#d0743c",
				"#ff8c00"
			]);
			
			d3G.selectAll("g")
				.data(parsedData)
				.enter().append("g")
				.attr("transform", d => "translate(" + x0(d.State) + ",0)")
				.selectAll('rect')
				.data(d => keys.map(key => {
					return {key: key, value: d[key]}
				}))
				.enter().append("rect")
				.attr("x", d => x1(d.key))
				.attr("y", d => y(d.value))
				.attr("width", x1.bandwidth())
				.attr("height", d => height - y(d.value))
			;
		}
	}
	
	ngOnChanges() {
		
	}
}