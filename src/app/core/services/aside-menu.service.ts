import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

//Interfaz donde defino los atributos del menu del aside
export interface IAsideMenu {
  title: string;
  url: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class AsideMenuService {

  //Funcionamiento del menu 
  /*Primero, crea un servicio Angular. Este servicio usará Subject de RxJS
  para permitir la comunicación entre componentes:*/
  private _showMenu= new Subject<boolean>();
  showMenu= this._showMenu.asObservable();


  //lista de Menu con todo lo que se requiere
  private asideMenuList: IAsideMenu[] = [
    { title: 'Panel', url: '/panel', icon: 'grid_view' },
    { title: 'Usuarios', url: '/usuarios', icon: 'person_add' }
  ];

  constructor() { }

  //@getAsideMenu(): me retorna una copiar de toda la lista
  getAsideMenu() {
    return [...this.asideMenuList];
  }

  //@getMenuByUrl: busca el menu por la URL especificada
  getAsideMenuByUrl(url:string):IAsideMenu{
    return this.asideMenuList.find(
      (menu)=>menu.url.toLowerCase() === url.toLowerCase()
    )as IAsideMenu
  }  

}
