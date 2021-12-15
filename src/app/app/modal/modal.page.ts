import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Note } from 'src/app/model/Note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() note;
  public formNota:FormGroup;
  constructor(
    private fb:FormBuilder,
    private notaService:NoteService,
    private modal:ModalController
  ) { }

  ngOnInit() {
    this.formNota=this.fb.group({
      title:[""],
      description:[""]
    });
  }
  /**
   * Edita la nota en el modal
   */
  public async editNote(){
    this.notaService.editNote(this.note)
    .then(async ()=>{
    
      this.modal.dismiss();
    })
    .catch((err)=>{
      console.log(err);
    })
  }

 
  volver(){
    this.modal.dismiss();
  }

}
