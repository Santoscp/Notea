import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input('clase') clase:string = 'btn btn-primary';
  @Input('texto') texto:string = 'Botón';
  @Output() action = new EventEmitter()
  constructor() { 

}
}
