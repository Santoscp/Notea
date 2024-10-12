import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Note } from '../model/note';
//import { Observable } from 'angularfire2/node_modules/rxjs/observable/Observable';
import{DocumentReference,AngularFirestoreCollection,AngularFirestore} from '@angular/fire/compat/firestore'
//import * as firebase from 'firebase';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  myCollection:any
  private fireStore:AngularFirestore = inject(AngularFirestore)

  constructor() {
    this.myCollection=this.fireStore.collection<any>(environment.firebaseConfig.collectionName)

   }
   addNote(note:Note):void{
    return this.myCollection.add(note)
    
   }

   readAll():any{
    return this.myCollection.get();
   }

   readNote(key:string):any{
    return this.myCollection.doc(key).get()

   }
   updateNote(note:Note):Promise<void>{
    return new Promise(async (resolve,reject)=>{
      if(!note.key) return reject;
      const {key,...data}=note
     try {
      resolve (await this.myCollection.doc(note.key).set(data))
      
     } catch (err) {
      reject(err)
      
     }
    })

   
   }

   deleteNote(note:Note):Promise<void>{
    return new Promise(async(resolve, reject)=>{
      if(!note.key) reject("Ky no asigned")

      try {
        resolve( await this.myCollection.doc(note.key).delete())
        
      } catch (err) {
        reject (err)
        
      }
     

    })
   
   }
}
