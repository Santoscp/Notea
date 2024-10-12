import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import{AngularFirestore,AngularFirestoreModule} from '@angular/fire/compat/firestore';
//import {AngularFireModule} from 'firebase';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    importProvidersFrom(AngularFirestoreModule),
    importProvidersFrom(AngularFireModule.initializeApp(environment.firebaseConfig)),
    provideRouter(routes),
  ],
});
