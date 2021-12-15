import { Component, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  //@ViewChild('mitoggle')
  public image:any
  

  constructor(private traductor:TranslateService,
              private storage:LocalStorageService) {
    
  traductor.setDefaultLang(window.navigator.language.split("-")[0]);
   
  }

  ionViewDidEnter(){
    this.traductor.getDefaultLang();
 
  }

   public async hazFoto(){
    let options: ImageOptions={
      resultType:CameraResultType.Uri,
      allowEditing:false,
      quality:90,
      source:CameraSource.Camera

    }
    let result:Photo =await Camera.getPhoto(options)
    this.image=result.webPath

  }
  cambiaIdioma(event){
    if(event && event.detail && event.detail.checked){
      this.storage.setItem('lang',{lang:'en'});
      
      this.traductor.use('en')
    }else{
      this.storage.setItem('lang',{lang:'es'});
      this.traductor.use('es')

    }

  }

}
