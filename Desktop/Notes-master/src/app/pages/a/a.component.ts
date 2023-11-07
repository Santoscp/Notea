import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-a',
  standalone: true,
  imports: [CommonModule,RouterModule],
  template: `
    <p>
      a works!
    </p>
    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class AComponent {

}
