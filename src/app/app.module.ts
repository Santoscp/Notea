import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from "@angular/common/http"
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalStorageService } from './services/local-storage.service';
import { AuthService } from './services/auth.service';


export function loadTrasnlator(http:HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/','.json')

}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    TranslateModule.forRoot({
      loader: {
        provide:TranslateLoader,
        useFactory:(loadTrasnlator),
        deps: [HttpClient]

      }
    })

    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LocalStorageService,AuthService
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
