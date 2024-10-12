import { Component } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Message } from './model/message';
import { CrudService } from './services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test';
  constructor(private serviceCRUD:CrudService){

  }
  ngOnInit(){
    let list:AngularFireList<any>=
    this.serviceCRUD.getAllMessages();
  }





  public addMessage(){
    let m:Message={
      nickname:'Carlos',
      text:'Hello world',

    }
    this.serviceCRUD.addMessage(m)
  
  }
  
}
