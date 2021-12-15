import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ModalPage } from '../app/modal/modal.page';
import { Note } from '../model/Note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public notas:Note[]=[]
  public miLoading:HTMLIonLoadingElement

  constructor(private ns:NoteService,
    private loading:LoadingController,
    private toastController:ToastController,
    public modal: ModalController) {}

  async presentLoading(){
    this.miLoading = await this.loading.create({
   
      message: '',
     
    });
    await this.miLoading.present();
  }

  async presentToast(msg:string,clr:string) {
    const miToast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color:clr,
    });
   await miToast.present();
  }
  
async ionViewDidEnter(){
  await this.cargaNotas()
}
/**
 * Carga todas las notas
 * @param event 
 */
  public async cargaNotas(event?){
    if(!event){
     await this.presentLoading()
    }
    this.notas=[];
    try{
      this.notas=await this.ns.getNotes().toPromise()

    }catch(err){
      console.error(err)
      await this.presentToast("Error cargando datos","danger");
    }finally{
      if(event){
        event.target.complete()
      }else{
       await this.miLoading.dismiss();
      }
    }
   
      
    }
    /**
     * Borra una nota
     * @param nota la nota para borrar
     */
    public async borra(nota:Note){
      await this.presentLoading();
      await this.ns.removeNote(nota.key);
      let i=this.notas.indexOf(nota,0)
      if(i>-1){
        this.notas.splice(i,1);

      }
      await this.miLoading.dismiss();
    }
    /**
     * Abre un modal para editar la nota
     * @param note la nota que queremos editar
     * @returns el modal para editar la nota
     */
    async editaNota(note:Note){
      const modal = await this.modal.create({
        component: ModalPage,
        componentProps: {'titulo':note.title,
                          'descripcion':note.description,
                        'note':note},
       
      });
     
      return await modal.present();
    }



  
  }


