import {Component, forwardRef, Inject} from '@angular/core';
import {OrdemServicoProvider} from "../../../providers/ordem-servico-provider";
import { Storage } from '@ionic/storage';
import {
  MenuController, App, ToastController, AlertController, LoadingController, NavParams,
  NavController, ModalController
} from "ionic-angular";
import {LoginService} from "../../../providers/login-service";
import {OrdemServicoRelPage} from "../ordem-servico-rel/ordem-servico-rel";



@Component({
  selector: 'page-ordens-servico-rel',
  templateUrl: 'ordens-servico-rel.html',
})
export class OrdensServicoRelPage {

  loginService  : LoginService;
  id_dispositivo;
  ordensRel;

    constructor(private  navParams: NavParams,
                private osProvider : OrdemServicoProvider,
                public loading: LoadingController,
                private storage: Storage,
                @Inject(forwardRef(() => LoginService)) loginService: LoginService,
                private nav: NavController,
                private modalCtrl : ModalController){
                this.id_dispositivo =  this.navParams.data;
                this.loginService = loginService;
    }


  ngOnInit(){
    this.getOrdensRel(this.id_dispositivo);
  }


  onViewOsRel(data : any){
    const modal =  this.modalCtrl.create(OrdemServicoRelPage, data);
    modal.present();
  }

  voltar(){
    this.nav.pop();
  }

  getOrdensRel(id_dispositivo){
    let loader = this.loading.create({
      content: 'Carregando Relatório...',
    });

    loader.present();
    this.storage.get('url').then((val) => {
      this.osProvider.getOrdensServicoRel(val, id_dispositivo).subscribe(
        result => {
          this.ordensRel = JSON.parse(result);
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
}


