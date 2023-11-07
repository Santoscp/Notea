import { Directive, ElementRef, HostListener, Input } from
'@angular/core';
@Directive({
standalone: true,
selector: '[appHighlight]'
})
export class HighlightDirective {
@Input()
appHighlight!:any;
constructor(private el: ElementRef) {
}
//añado control de eventos sobre los elementos que
//se les aplique la directiva
@HostListener('mouseenter') onMouseEnter() {
this.el.nativeElement.style.border='1px solid black';
let el=(this.el.nativeElement) as HTMLElement;
if(el.children.length > 0){
(el.children[0] as HTMLElement).style.border='1px solid black';
}
}
@HostListener('mouseleave') onMouseLeave() {
this.el.nativeElement.style.border='0px solid black';
let el=(this.el.nativeElement) as HTMLElement;
if(el.children.length > 0){
(el.children[0] as HTMLElement).style.border='0px solid black';
}
}
}
