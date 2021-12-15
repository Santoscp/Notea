import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { User } from '@codetrix-studio/capacitor-google-auth/dist/esm/user';
import { async } from '@firebase/util';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: any;
  private isAndroid = false;

  constructor(private storage:LocalStorageService,
    private afauth:AngularFireAuth) { }


/**
 * Coprueba si esta logeado
 * @returns true si lo esta, false si no
 */
  public isLoged():boolean{
    if(this.user) return true; return false;
  }

/**
 * Login de google por parte de codetrix
 */
  public async login(){
    let user:User = await GoogleAuth.signIn();
    this.user=user;
    await this.keepSession();
  }

/**
 * Logout de google por parte de codetrix
 */
  public async logout(){
    await GoogleAuth.signOut();
    await this.storage.removeItem('user');
    this.user=null;
  }
/**
 * Carga sesion del local storage
 */
  public async loadSession(){
    let user= await this.storage.getItem('user');
    if(user){
      user=JSON.parse(user);
      this.user=user;
    }
  }
  
/**
 * Mantiene la sesion iniciada en el local storage
 */
  public async keepSession(){
    await this.storage.setItem('user',JSON.stringify(this.user));
  }
  /**
   * Registro del usuario por firebase
   * @param userdata c
   * @returns true si se ha podido registart bien el usuario, false si no
   */

  public registerUser(userdata: { email: any; password: any; }): Promise<Boolean> {
    return new Promise(async (resolve, rejects) => {
      return this.afauth.createUserWithEmailAndPassword(userdata.email, userdata.password)
      .then(async data => {
        if ( data!= null && data.user != null) {
          this.user = {
            displayName: data.user?.displayName,
            email: data.user?.email, 
            uid: data.user?.uid
          };
          await this.keepSession();
          resolve(true);
        } else {
          rejects(false);
          this.user = null;
        }
      })
    })
  }
  /**
   * Inicio de sesion de firebase
   * @param userdata El usuario a iniciar sesion
   * @returns true si se ha iniciado correctamente, false si no
   */

  public signInUser(userdata: { email: any; password: any; }): Promise<Boolean> {
    return new Promise(async (resolve,rejects)=>{
      return this.afauth.signInWithEmailAndPassword(userdata.email,userdata.password).then(async data=>{
        if ( data!= null && data.user != null) {
          this.user = {
            displayName: data.user?.displayName,
            email: data.user?.email, 
            uid: data.user?.uid
          };
          await this.keepSession();
          resolve(true);
        } else {
          rejects(false);
          this.user = null;
        }


        
      })
      
    
    
    
    
    })
  }
  
}

