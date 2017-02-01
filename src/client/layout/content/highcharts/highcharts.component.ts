import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from "@angular/core";

const Highcharts = require('highcharts/highcharts.src');

// Zooming example: http://jsfiddle.net/P45Hy/3/

@Component({
    selector: '.highcharts',
    templateUrl: './highcharts.component.html'
})
export class HighchartsComponent implements AfterViewInit, OnDestroy {
    @ViewChild('chart') public chartEl: ElementRef;

    private _chart: any;

    public ngAfterViewInit() {
        let opts: any = {

            title: {
                text: 'Total fruit consumtion, grouped by gender'
            },

            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
                type: 'datetime',
                plotBands: {
                    events: {
                        click: function (e) {
                            console.log(e);
                        }
                    }
                }
            },

            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: 'Number of fruits'
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Total: ' + this.point.stackTotal;
                }
            },

            plotOptions: {
                column: {
                    stacking: 'normal'
                },
                series: {
                    events: {
                        click: function (event) {
                            console.log(
                                this.name + ' clicked. Alt: ' + event.altKey + ', Control: ' + event.ctrlKey + ', Meta: ' + event.metaKey + ', Shift: ' + event.shiftKey
                            );
                        }
                    }
                }
            },

            series: [{
                name: 'John',
                data: [5, 3, 4, 7, 2],
                stack: 'male'
            }, {
                name: 'Joe',
                data: [3, 4, 4, 2, 5],
                stack: 'male'
            }, {
                name: 'Jane',
                data: [2, 5, 6, 2, 1],
                stack: 'female'
            }, {
                name: 'Janet',
                data: [3, 0, 4, 4, 3],
                stack: 'female'
            }]
        };

        if (this.chartEl && this.chartEl.nativeElement) {
            opts.chart = {
                type: 'column',
                renderTo: this.chartEl.nativeElement
            };

            this._chart = new Highcharts.Chart(opts);
        }
    }

    public ngOnDestroy() {
        this._chart.destroy();
    }
}