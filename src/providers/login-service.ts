///<reference path="../../node_modules/rxjs/Observable.d.ts"/>
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Headers} from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import {AlertController, LoadingController, App, ToastController, MenuController} from "ionic-angular";
import {Login} from "../models/Login";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";

/*
  Generated class for the LoginService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginService {

  private usuarioLogado : Login  = null;
  private homePage =  HomePage;
  private loginPage = LoginPage;


  constructor(
    private http: Http,
    private alertCtrl: AlertController,
    public loading: LoadingController,
    private app: App,
    private storage: Storage,
    private toastCtrl: ToastController,
    private menuCtrl: MenuController,

  ) {


  }

  deslogarUsuario(mensagem : string){
    this.usuarioLogado = null;

    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'top'
    });

    toast.present();

    this.menuCtrl.close();
    this.menuCtrl.swipeEnable(false, 'menu1');
    this.app.getActiveNav().setRoot(this.loginPage);

  }

  redirecinoarParaHome(titulo : string, mensagem : string){

    this.app.getActiveNav().setRoot(this.homePage);
    const alert =  this.alertCtrl.create({
      title : titulo,
      message:  mensagem,
      buttons: ['OK']
    });
    alert.present();
  }

  getUsuario(){
    return this.usuarioLogado;
  }

  usuarioIsLogado(){
    if(this.usuarioLogado != null){
      return true;
    }else{
      return false;
    }
  }



  login(login: string, senha : string){

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    var credentials = "grant_type=password"
      + "&username=" + login +""
      + "&password=" + senha + ""
    /* etc. */

    let loader = this.loading.create({
      content: 'Autenticando...',
    });

    var url = "";
    this.storage.get('url').then((val) => {
      url = val;
    });

    loader.present().then(() => {
    this.http.post(url + '/token', credentials, { headers: headers }).map(res => res)
      .subscribe(
        res => {

          var responseUser = JSON.parse(res.text());
          this.usuarioLogado =  new Login(responseUser.id_login,responseUser.username,responseUser.access_token );
          loader.dismiss();
          this.app.getActiveNav().setRoot(this.homePage);
      },
        (err) =>{
          const alert =  this.alertCtrl.create({
            title : 'Erro te autenticação',
            message:  err.status == 400 ? 'Verifique seu login e senha' : 'Verifique a conexão com a internet / servidor',
            buttons: ['OK']
          });
          alert.present();
          loader.dismiss();
        }
      );

    });
  }


  autenticarCelular(url, ddd, numero){
    var credentials =  "?ddd=" + ddd +""
      + "&numero=" + numero + ""
    var headers = new Headers();
    return this.http.get(url+'/api/data/autenticaCelular' + credentials, { headers: headers }).map(res => res.json());
  }
}
