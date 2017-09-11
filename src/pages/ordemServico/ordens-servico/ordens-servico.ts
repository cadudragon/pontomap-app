import {Component, forwardRef, Inject} from '@angular/core';
import {OrdemServicoProvider} from "../../../providers/ordem-servico-provider";
import { Storage } from '@ionic/storage';
import {MenuController, App, ToastController, AlertController, LoadingController} from "ionic-angular";
import {LoginService} from "../../../providers/login-service";
import {LoginPage} from "../../login/login";
import {OrdemServicoPage} from "../ordem-servico/ordem-servico";


@Component({
  selector: 'page-ordens-servico',
  templateUrl: 'ordens-servico.html',
})
export class OrdensServicoPage {

  ordensServico: any;
  qtdOrdens : any;
  loginService  : LoginService;
  loginPage = LoginPage;
  ordemPage = OrdemServicoPage;

  constructor(private osProvider : OrdemServicoProvider,
              private storage: Storage,
              @Inject(forwardRef(() => LoginService)) loginService: LoginService,
              public loading: LoadingController,
              ){
                  this.loginService =  loginService;
}

  ionViewWillEnter() {
    this.getOrdens();
  }

  getOrdens(){

    console.log('entrou');

    let loader = this.loading.create({
      content: 'Carregando ordens...',
    });

    loader.present();
    this.storage.get('url').then((val) => {
      this.osProvider.getOrdens(val).subscribe(
        result => {
          this.ordensServico = JSON.parse(result);
          this.qtdOrdens = this.ordensServico.length;
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

  editarOrdem(ordem : any){
    console.log(ordem);
  }
}


