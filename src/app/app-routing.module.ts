import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './modules/auth/pages/page-login/page-login.component';
import { authGuard } from './utils/auth.guard';

/*@routes: Defino el enrutamiento que va a tener mi webApp
canLoad[]: previene la carga de la ruta hasta que se cumpla una condicion
loadchildren: es lazyload*/
const routes: Routes = [
  //login management
  // {path: '**', redirectTo: 'login', pathMatch: 'full'},
  {path: '', redirectTo: 'usuarios', pathMatch: 'full'},
  // {path:'', component:PageLoginComponent},
  {path:'login', component:PageLoginComponent},
  //{path:'panel', component:PageDashboardComponent},
  {path:'usuarios', loadChildren:() =>import('./modules/auth/auth.module').then((m)=>m.AuthModule), canActivate:[authGuard]},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
