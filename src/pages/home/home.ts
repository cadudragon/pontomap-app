import {Component, forwardRef, Inject} from '@angular/core';
import {LoginService} from "../../providers/login-service";
import { MenuController} from "ionic-angular";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loginService  : LoginService;
  usuarioAtivo: any;
  constructor( @Inject(forwardRef(() => LoginService)) loginService: LoginService,
               private menu: MenuController) {
  this.loginService = loginService;
  this.usuarioAtivo =  this.loginService.getUsuario();
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(true, 'menu1');
  }
}
