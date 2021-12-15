import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../model/Note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private last:any=null
  private myCollection:AngularFirestoreCollection

  constructor(private db:AngularFirestore) { 
    this.myCollection=db.collection<any>(environment.firebaseConfig.todoCollection)
  }
/**
 * Añade una nota a firebase
 * @param note la nota a añadir
 * @returns true si se añade correctamenre, false si no
 */
  public addNote( note:Note){
    return new Promise (async (resolve,rejects)=>{
      try{
        let response:DocumentReference<firebase.default.firestore.DocumentData>=
        await this.myCollection.add(note)
        resolve(response.id)
      }catch(err){
        rejects(err)

      }
    })
    

  }
/**
 * Obtiene todas las notas de firebase
 * @returns un observable de todas las notas
 */
  public getNotes():Observable<Note[]>{
    return new Observable((observer)=>{
      let result:Note[]=[];

    this.myCollection.get().subscribe(
      (data:firebase.default.firestore.QuerySnapshot<firebase.default.firestore.DocumentData>)=>{
        data.docs.forEach((d:firebase.default.firestore.DocumentData)=>{
          let tmp=d.data();//devuelve el objeto almacenado -> la nota con title
          let id=d.id;//devuelve la key del objeto
          result.push({'key': d.id,...tmp});
          //operador spread-> 'title' : tmp.title,'descripcion': tmp.description
        })
        observer.next(result);
        observer.complete();
      })
      
    })

    

  }
  /**
   * Obtiene notas por pagina
   * @param page la pagina para mostrar las notas
   * @param criteria opcional para filtrar
   * @returns un observale con la nta
   */

  public getNotesByPage(page:number=1,criteria?:any):Observable<Note[]>{
    return new Observable((observer)=>{
      let result:Note[]=[];

      this.db.collection<any>(environment.firebaseConfig.todoCollection,
        ref=>ref.limit(10))
        
        
        
        .get().subscribe(
      (data:firebase.default.firestore.QuerySnapshot<firebase.default.firestore.DocumentData>)=>{
        data.docs.forEach((d:firebase.default.firestore.DocumentData)=>{
          let tmp=d.data();//devuelve el objeto almacenado -> la nota con title
          let id=d.id;//devuelve la key del objeto
          result.push({'key': d.id,...tmp});
          //operador spread-> 'title' : tmp.title,'descripcion': tmp.description
        })
        observer.next(result);
        observer.complete();
      })
      
    })
    
    
  }
  


    
  
/**
 * Obtiene una nota
 * @param id clave de la nota a buscar
 * @returns un observable con la nota
 */
  public  getNote(id:string):Promise<Note>{
    return new Promise(async(resolve,rejects)=>{
      let note:Note=null;
      try{
        let result:firebase.default.firestore.DocumentData=await this.myCollection.doc(id).get().toPromise()
        note={
          id:result.id,
          ...result.data()
        }
        resolve(note)
      }catch(err){
        rejects(err)

      }
    })

    

    
   
  }
/**
 * Elimina una nota
 * @param id clave de a nota a eliminar
 * @returns Promesa con la nota aliminada
 */

  public removeNote(id:string):Promise<void>{
    return this.myCollection.doc(id).delete()
  }
/**
 * Edita una nota
 * @param note la nota que queremos editar
 * @returns una Promesa con la nta editada
 */
  public editNote(note: Note): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        
          await this.myCollection.doc(note.key).update({
            title: note.title,
            description: note.description
          });
        resolve(note.key);
      } catch (err) {
        reject(err);
      }
    })
  }
  
}
