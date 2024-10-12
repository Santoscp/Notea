import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,IonItem,IonLabel,
  IonInput,IonTextarea,IonDatetimeButton,IonModal,IonDatetime,IonButton,IonIcon,LoadingController } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormBuilder, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { Note } from '../model/note';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,
    IonItem,IonLabel,IonInput,IonTextarea,IonDatetimeButton,IonModal,IonDatetime,IonButton,IonIcon,ReactiveFormsModule
  ],
})
export class Tab1Page {
  public loadinS=inject(LoadingController)
  public form!:FormGroup
  private formB= inject(FormBuilder)
  constructor() {
    this.form=this.formB.group({
      title:['',[Validators.required,Validators.minLength(4)]],
      description:['']
    })

  }
  public async saveNote():Promise<void>{
    let note:Note={
      title:this.form.get("title")?.value,
      description:this.form.get("description")?.value,
      date:Date.now().toLocaleString()
    }
    this.loadinS=await this.loadinS.create({})
  }
}
