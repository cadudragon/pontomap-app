import { Component, forwardRef, Inject } from '@angular/core';
import {NavController, MenuController, AlertController, LoadingController} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import { Storage } from '@ionic/storage';
import {LoginService} from "../../providers/login-service";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginService  : LoginService;
  celAutenticado: boolean = false;

  constructor(
    private menu: MenuController,
    private  navCtrl: NavController,
    @Inject(forwardRef(() => LoginService)) loginService: LoginService,
    public alertCtrl: AlertController,
    private storage: Storage,
    public loading: LoadingController
    ) {
    this.loginService = loginService;
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
  }


  onLogin(form: NgForm){
    this.loginService.login(form.value.login, form.value.senha)
  }



  showSobre() {
    let alert = this.alertCtrl.create({
      title: 'Sobre',
      subTitle: 'Aplicativo para registro de ponto  <br><br> ' +
      'Ponto Map',
      buttons: ['OK']
    });
    alert.present();
  }

  //=======================================
}
