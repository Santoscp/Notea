import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database'


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private db:AngularFireDatabase) { }


  addMessage(msg:Message){
    this.db.database.ref("/messages").push(msg)

  }
  getAllMessages():AngularFireList<any>{
  return this.db.list("/messages");
  }

  removeClient(id:number):Promise<boolean>{
return new Promise((resolve,reject)=>{
  
})
  }
}
