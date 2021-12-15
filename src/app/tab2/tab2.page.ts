import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Note } from '../model/Note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public formNota:FormGroup
  public miLoading:HTMLIonLoadingElement
  public miToast:HTMLIonToastElement

  constructor(private fb:FormBuilder,
              private noteS:NoteService,
              private loading:LoadingController,
              private toastController:ToastController ) {
    this.formNota=this.fb.group({
      title:["",Validators.required],
      description:[""]
    })
  }

  ionViewDidEnter(){
   
  }
  async presentLoading(){
    this.miLoading = await this.loading.create({
   
      message: '',
     
    });
    await this.miLoading.present();
  }

  async presentToast(msg:string,clr:string) {
    this.miToast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color:clr,
    });
   await this.miToast.present();
  }
/**
 * Agrega una nota
 */
  public async addNote(){
    let newNota:Note={
      title:this.formNota.get("title").value,
      description:this.formNota.get("description").value

    }
    await this.presentLoading()
    let id= await this.noteS.addNote(newNota);
    this.miLoading && this.miLoading.dismiss()

    await this.presentToast("hola","success")
    

    this.formNota.reset();

  }

}
