import {Component, forwardRef, Inject} from '@angular/core';
import { IonicPage, NavController, NavParams,Platform, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {PontoProvider} from "../../providers/ponto-provider";

import {HomePage} from "../home/home";
import {LoginService} from "../../providers/login-service";
import { Geolocation } from '@ionic-native/geolocation';



/**
 * Generated class for the RegistroPonto page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registro-ponto',
  templateUrl: 'registro-ponto.html',
})
export class RegistroPonto {

  loginService  : LoginService;
  registrosDePonto: any;

  constructor(public nav: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public loading: LoadingController,
              private storage: Storage,
              @Inject(forwardRef(() => LoginService)) loginService: LoginService,
              private pontoProvider : PontoProvider,
              private geolocation: Geolocation) {

  }

  ngOnInit(){
    this.platform.registerBackButtonAction(() => {
      if(this.nav.canGoBack()){
        this.nav.pop();
      }
    });
  }

  ionViewDidLoad(){

  }

  voltar(){
    this.nav.setRoot(HomePage)
  }


  getRegistosDeponto(){
    let loader = this.loading.create({
      content: 'Carregando Registros de Ponto...',
    });

    loader.present();
    this.storage.get('url').then((val) => {
      this.pontoProvider.getRegistrosDePonto(val).subscribe(
        result => {
          this.registrosDePonto = JSON.parse(result);
          console.log(this.registrosDePonto);
          loader.dismiss();
        },
        err =>{

          if(err.status == 401){
            this.loginService.deslogarUsuario('Sessão expirou, necessário realizar novo login.');
          }else{
            this.loginService.redirecinoarParaHome('Erro de conexão','Verifique sua a conexão de internet/servidor e tente acessar novamente');
          }
          loader.dismiss();
        } ,
        () => {

        }
      );
    });
  }

  registrarPonto(){
    this.geolocation.getCurrentPosition().then((resp) => {
      alert('lat: ' + resp.coords.latitude + " lng: "+ resp.coords.longitude);
    }).catch((error) => {
      alert('Error getting location' +  error);
    });

  }

}
