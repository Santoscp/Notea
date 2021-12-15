import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GoogleAuth} from '@codetrix-studio/capacitor-google-auth'
import { User } from '@codetrix-studio/capacitor-google-auth/dist/esm/user';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userinfo:User
  public isAndroid:boolean;

  constructor(private platform:Platform,private as:AuthService, private rooter:Router) { 
    GoogleAuth.init();
    /*this.isAndroid=platform.is("android");
    if(!this.isAndroid){
    GoogleAuth.init();
    } //Lee la config clientId del meta index.html
    */
  }

  ngOnInit() {
  }
  public async signin(){
    try{
   let user:User=await GoogleAuth.signIn();
   this.userinfo=user
   this.as.user=user
   this.rooter.navigate(['private/tabs/tab1'])
    }catch(err){
      console.log(err)
    }

  }

  
  

}
