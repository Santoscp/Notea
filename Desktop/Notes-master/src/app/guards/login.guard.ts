import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';




export const loginGuard: CanActivateFn = (route, state) => {
  const loginS= inject(LoginService)
  const router=inject(Router)

  let _originalPath:string=''


  const mockLogin=loginS.isAuth();
  let result=false;
      if(!mockLogin){
        //Not Logged
        if(route.url[0].toString()!='login'){
          //you're not logged?, ---> not alowed --> go login
          loginS.originalPath=route.url[0].toString();
          router.navigate(['/login']);
        }else{
          result=true;
        }
      }else{
        //Logged
        if(route.url[0].toString()=='login'){
          //again in login?, ---> not alowed
          router.navigate(['']);
        }else{
          result=true;
        }
      }
  

  
  
  
  
  return result;






};

