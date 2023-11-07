import { Component } from '@angular/core';
import { INote } from './model/inote';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'holamundo';


   editingNote($event:INote){
    console.log("Editando Nota");
    console.log($event);
   }
   removingNote($event:INote){

   }
   public alerta(){
    alert("Alerta Roja");
    }
  
 
}
