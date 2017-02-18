import {Component, ElementRef, OnChanges, OnInit, ViewChild} from "@angular/core";

import {D3, D3Service, Selection} from 'd3-ng2-service';
import {DSVParsedArray} from "d3-dsv";
import {ScaleOrdinal, ScaleBand, ScaleLinear} from "d3-scale";

@Component({
	selector: '.d3bar',
	template: '<svg></svg>',
	styleUrls: ['bar.d3.component.scss']
})
export class BarD3Component implements OnInit, OnChanges {
	private data: any;
	private parsedData: DSVParsedArray<any>;
	private keys: Array<string>;
	private margin: any = {top: 40, bottom: 40, left: 40, right: 40};
	private parentNativeElement: any;
	private d3: D3;
	private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
	private svgParentElement: Selection<HTMLElement, any, null, undefined>;
	private d3G: Selection<SVGGElement, any, null, undefined>;
	private height: number;
	private width: number;
	private xScale: ScaleBand<string>;
	private xGroupScale: ScaleBand<string>;
	private yScale: ScaleLinear<number, number>;
	private colorGroupScale: ScaleOrdinal<string, any>;
	
	constructor(private element: ElementRef, private d3Service: D3Service) {
		this.parentNativeElement = element.nativeElement;
		this.d3 = d3Service.getD3();
	}
	
	ngOnInit() {
		if (this.parentNativeElement !== null) {
			this.setupSvg();
			this.readAndParseData();
			this.setupScales();
			this.drawBars();
			this.drawLegend();
			
			this.d3G.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(0," + this.height + ")")
				.call(this.d3.axisBottom(this.xScale));
			
			this.d3G.append("g")
				.attr("class", "axis")
				.call(this.d3.axisLeft(this.yScale).ticks(null, "s"))
				.append("text")
				.attr("x", 2)
				.attr("y", this.yScale(this.yScale.ticks().pop()) + 0.5)
				.attr("dy", "0.32em")
				.attr("fill", "#000")
				.attr("font-weight", "bold")
				.attr("text-anchor", "start")
				.text("Population");
		}
	}
	
	ngOnChanges() {
		
	}
	
	private drawLegend() {
		let legend = this.d3G.append("g")
			.attr("font-family", "sans-serif")
			.attr("font-size", 10)
			.attr("text-anchor", "end")
			.selectAll("g")
			.data(this.keys.slice().reverse())
			.enter().append("g")
			.attr("transform", (d, i) => `translate(0, ${i * 20})`);

		legend.append("rect")
			.attr("x", this.width - 19)
			.attr("width", 19)
			.attr("height", 19)
			.attr("fill", this.colorGroupScale);

		legend.append("text")
			.attr("x", this.width - 24)
			.attr("y", 9.5)
			.attr("dy", "0.32em")
			.text(d => d);
	}
	
	private setupSvg() {
		this.svgParentElement = this.d3.select(this.parentNativeElement);
		this.width = this.parentNativeElement.offsetWidth - this.margin.left - this.margin.right;
		this.height = this.parentNativeElement.offsetHeight - this.margin.top - this.margin.bottom;
		this.d3Svg = this.svgParentElement.select<SVGSVGElement>('svg')
			.attr('viewBox', '0 0 ' + this.parentNativeElement.offsetWidth + ' ' + this.parentNativeElement.offsetHeight)
			.attr('preserveAspectRatio', 'xMinYMin');
		this.d3G = this.d3Svg.append<SVGGElement>('g')
			.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
	}
	
	private readAndParseData() {
		this.data = require('./data.csv');
		this.parsedData = this.d3.csvParse(this.data);
		this.keys = this.parsedData.columns.slice(1);
	}
	
	private setupScales() {
		this.xScale = this.d3.scaleBand()
			.domain(this.parsedData.map(d => d.State))
			.rangeRound([0, this.width])
			.paddingInner(0.1);
		this.xGroupScale = this.d3.scaleBand()
			.domain(this.keys)
			.rangeRound([0, this.xScale.bandwidth()])
			.padding(0.05);
		this.yScale = this.d3.scaleLinear()
			.domain([0, this.d3.max(this.parsedData, d => this.d3.max(this.keys, key => +d[key]))])
			//.domain([0, this.d3.max(this.parsedData, d => this.d3.max(this.keys, key => this.splitAndSum(d[key])))])
			.nice()
			.rangeRound([this.height, 0]);
		this.colorGroupScale = this.d3.scaleOrdinal()
			.domain(this.keys)
			.range([
				"#98abc5",
				"#8a89a6",
				"#7b6888",
				"#6b486b",
				"#a05d56",
				"#d0743c",
				"#ff8c00"
			]);
	}
	
	private drawBars() {
		/*this.d3G.selectAll("g")
			.data(this.parsedData)
			.enter().append("g")
			.attr("transform", d => "translate(" + this.xScale(d.State) + ",0)")
			.selectAll('rect')
			.data(d => this.keys.map(key => {
				return {key: key, value0: +d[key].split('|')[0], value1: +d[key].split('|')[1]}
			}))
			.enter().append("rect")
			.attr("x", d => this.xGroupScale(d.key))
			.attr("y", d => this.yScale(d.value1 + d.value0))
			.attr("width", this.xGroupScale.bandwidth())
			.attr("height", d => this.height - this.yScale(d.value1))
		;*/
		
		this.d3G.selectAll("g")
			.data(this.parsedData)
			.enter().append("g")
			.attr("transform", d => "translate(" + this.xScale(d.State) + ",0)")
			.selectAll('rect')
			.data(d => this.keys.map(key => {
				return {key: key, value: +d[key]}
			}))
			.enter().append("rect")
			.attr("x", d => this.xGroupScale(d.key))
			.attr("y", d => this.yScale(d.value))
			.attr("width", this.xGroupScale.bandwidth())
			.attr("height", d => this.height - this.yScale(d.value))
			.attr("fill", d => this.colorGroupScale(d.key))
			.on('click', d => console.log(this.d3.event));
	}
	
	private splitAndSum(array) {
		return array.split('|').reduce((a, b) => +a + +b, 0);
	}
}