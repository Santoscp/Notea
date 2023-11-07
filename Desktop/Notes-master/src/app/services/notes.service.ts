import { Injectable } from '@angular/core';
import { INote } from '../model/inote';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public notes: INote[] = [
    { id: 1, title: 'Nota1', description: "Hola Mundo" },
    { id: 2, title: 'Nota2', description: "Hello World" },
  ];
  constructor() { }
  public createNote(newNote: INote) {
    let id=Math.floor(Math.random()*1000)+1
    this.notes.push(newNote);
  }
  public removeNote(id: any) {
    let newNotes = this.notes.filter((n) => {
      return n.id != id;
    });
    this.notes = newNotes;
  }
  public getNotes(): INote[] {
    return this.notes;
  }
  public updateNote(note:INote){
    let n=this.notes.map(n=>{
    if(n.id==note.id){
    n.title=note.title;
    n.description=note.description;
    }
    return n;
    })
    }
}
