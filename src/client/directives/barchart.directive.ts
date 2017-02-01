import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[bar-chart]',
})
export class BarchartDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}