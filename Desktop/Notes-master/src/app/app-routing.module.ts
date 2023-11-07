import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AComponent } from './pages/a/a.component';
import { BComponent } from './pages/b/b.component';
import { Error404Component } from './components/error404/error404.component';
import { SubaComponent } from './pages/a/suba/suba.component';
import { SubbComponent } from './pages/a/subb/subb.component';
import { guardGuard } from './guards/guard.guard';
import { NotesComponent } from './pages/notes/notes.component';
import { loginGuard } from './guards/login.guard';
import { NewComponent } from './pages/new/new.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  {path:'home',component:NotesComponent,canActivate:[loginGuard]},
  {path:'new',component:NewComponent,canActivate:[loginGuard]},
  {path:'about',loadComponent:()=>import('./pages/about/about.component').then(c=>c.AboutComponent)},
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'login',component:LoginComponent,canActivate:[loginGuard]},
  {path:'**',component:Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
