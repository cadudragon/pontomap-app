import {Component, ViewChild,  forwardRef, Inject} from '@angular/core';
import { MenuController, NavController, Platform, App} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {OrdemServicoPage} from "../pages/ordemServico/ordem-servico/ordem-servico";
import {HomePage} from "../pages/home/home";
import {LoginService} from "../providers/login-service";
import {OrdensServicoPage} from "../pages/ordemServico/ordens-servico/ordens-servico";

import {RegistroPonto} from "../pages/registro-ponto/registro-ponto";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  loginService  : LoginService;

  loginPage = LoginPage;
  ordensServico =  OrdensServicoPage;
  osPage = OrdemServicoPage;
  homePage = HomePage;
  rootPage: any = this.homePage;

  registroPontoPage = RegistroPonto;


  @ViewChild('nav') nav: NavController

  constructor(private platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              @Inject(forwardRef(() => LoginService)) loginService: LoginService,
              private app: App,
              private storage: Storage
  ) {
    this.platform = platform;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.loginService = loginService;
      statusBar.styleDefault();
      splashScreen.hide();



    });

    //teste
    storage.set('url', 'http://cadu8ferreira-001-site1.btempurl.com');


    //produção
    //storage.set('url', 'http://189.50.187.131:8078');

  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  logOut(){
    this.platform.exitApp();
    /*
    this.menuCtrl.close();
    this.menuCtrl.swipeEnable(false, 'menu1');
    this.loginService.deslogarUsuario('Logout realizado com sucesso.');
    this.app.getActiveNav().setRoot(this.loginPage);
    */
  }
}

