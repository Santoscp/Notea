import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
 
  
  constructor(private storage:LocalStorageService,
              private traductor:TranslateService) {
    (async()=>{
      let lang=await storage.getItem("lang");
      if(lang==null){
        lang.this.traductor.getBrowserLang();

      }else{
        lang=lang.lang
      }
     /* if(this.langsAvaliable.indexOf(lang)>-1){
        TransformStreamDefaultController.setDefaultLang(lang)
      }else{
        traductor.setDefault('en');
      }*/
    })
  }
}
