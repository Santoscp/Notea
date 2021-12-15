import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private authS:AuthService,
    private router:Router) { }
    
  canActivate(route: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot):
               boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
              
              if(!this.authS.isLoged){
                this.router.navigate(['']);
              }
              
              return this.authS.isLoged();
  }
}
