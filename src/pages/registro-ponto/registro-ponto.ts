import {Component, forwardRef, Inject, NgZone} from '@angular/core';
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
  labelBtnBaterPonto: string;


  constructor(public nav: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public loading: LoadingController,
              private storage: Storage,
              @Inject(forwardRef(() => LoginService)) loginService: LoginService,
              private pontoProvider : PontoProvider,
              private geolocation: Geolocation,
              private zone: NgZone) {
    this.loginService =  loginService;
  }

  ngOnInit(){
    this.platform.registerBackButtonAction(() => {
      if(this.nav.canGoBack()){
        this.nav.pop();
      }
    });
  }

  ionViewDidEnter(){
    this.getRegistosDeponto();
    this.mudarLabelBtnRegistrarPonto();
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


          this.zone.run(() => {
            this.registrosDePonto = JSON.parse(result);
            this.mudarLabelBtnRegistrarPonto();

          });

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

    let loader = this.loading.create({
      content: 'Requisitando posicionamento do aparelho...',
    });

    loader.present();
    this.geolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: true, maximumAge: 0}).then((resp) => {

      var lat = resp.coords.latitude.toString().replace(".",",");
      var lng = resp.coords.longitude.toString().replace(".",",");

      this.storage.get('url').then((val) => {
        this.pontoProvider.registrarPonto(val, lat, lng).subscribe(
          result => {
            loader.dismiss();
            this.getRegistosDeponto();
          },
          err =>{
            loader.dismiss();
            if(err.status == 401){
              this.loginService.deslogarUsuario('Sessão expirou, necessário realizar novo login.');
            }else{
              this.loginService.redirecinoarParaHome('Erro de conexão','Verifique sua a conexão de internet/servidor e tente acessar novamente');
            }
          } ,
          () => {

          }
        );
      });

    }).catch((error) => {
      loader.dismiss();
      this.loginService.redirecinoarParaHome('Erro de conexão','Verifique suas a conexões de internet/GPS e tente acessar novamente');
    });
  }

  mudarLabelBtnRegistrarPonto(){
    if(Array.isArray(this.registrosDePonto)){
      this.labelBtnBaterPonto =  this.registrosDePonto.length % 2 == 0 ?  "Registrar Entrada" : "Registrar Saída";
    }else{
      this.labelBtnBaterPonto =  "Registrar Entrada";
    }
  }
}
