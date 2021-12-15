import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  /**
   * Guarda informacion en el local storage
   * @param key identificador de la informacion a guardar
   * @param value el valor que se va a guardar
   * @returns true si se ha guardado con exito, false si no
   */

  public async setItem(key:string, value:any):Promise<boolean>{
    let result:boolean=false;
    try{
      await Storage.set({
        key:key,
        value:JSON.stringify(value)
      })
      result=true;

    }catch(err){
      console.log(err)

    }


    return Promise.resolve(result);
  }
  /**
   * Obtiene informacion del local-Strogare
   * @param key identificarod para pbtener el valor
   */
  public async getItem(key:string):Promise<any>{
    let value=null;
    try{
     value= await Storage.get({key:key});
     value=value.value
     if(value!=null){
      value.JSON.parse(value)

     }
    
    }catch(err){
      console.log(err)

    }

  }
  /**
   * Elimina la informacion del local storage
   * @param key clave de la informacion a aliminar
   * @returns true si se ha eliminado correctamente,false si no
   */
  public async removeItem(key:string):Promise<boolean>{
    let result:boolean = false
    try{
     await Storage.remove({key:key})
     
      result=true;

    }catch(err){
    console.log(err)
    }
    return Promise.resolve(result)

  }
}
