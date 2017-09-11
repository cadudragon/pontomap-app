import {Component, forwardRef, Inject} from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, NavParams, ToastController, Platform,
  NavController
} from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import {LoginService} from "../../../providers/login-service";
import {OrdemServicoProvider} from "../../../providers/ordem-servico-provider";
import {OrdensServicoRelPage} from "../ordens-servico-rel/ordens-servico-rel";
import {HomePage} from "../../home/home";





@IonicPage()
@Component({
  selector: 'page-ordem-servico',
  templateUrl: 'ordem-servico.html',
})
export class OrdemServicoPage {

  ordensServicoRelPage: any;
  homePage : HomePage;
  ordemServico : any;
  loginService  : LoginService;
  ordemStartada: boolean = false;

  constructor( private  navParams: NavParams,
               private osProvider : OrdemServicoProvider,
               public loading: LoadingController,
               private storage: Storage,
               public http: Http,
               @Inject(forwardRef(() => LoginService)) loginService: LoginService,
               private toastCtrl: ToastController,
               public alertCtrl: AlertController,
               public platform: Platform,
              private nav: NavController){


             this.ordensServicoRelPage =  OrdensServicoRelPage;
              this.loginService =  loginService;
              }

  ngOnInit(){
    this.ordemServico =  this.navParams.data;
    if(this.ordemServico.DT_INICIO != null){
      this.ordemStartada =  true;
    }

    this.ordemServico.DESCRICAO_ATENDIMENTO =  this.ordemServico.DESCRICAO_ATENDIMENTO == 'null' ? '' : this.ordemServico.DESCRICAO_ATENDIMENTO;
    this.ordemServico.MATERIAL_UTILIZADO =  this.ordemServico.MATERIAL_UTILIZADO == 'null' ? '' : this.ordemServico.MATERIAL_UTILIZADO;

    this.platform.registerBackButtonAction(() => {
      if(this.nav.canGoBack()){
        this.nav.pop();
      }
    });
  }


  voltar(){
    this.nav.pop();
  }


  iniciarAtendimento(){
    var loader = this.loading.create({
      content: 'Iniciando atendimento...',
    });

    loader.present();


    Promise.all([
      this.storage.get('url'),
      this.storage.get('celNumber'),
    ])
      .then(([url,celNumber]) => {
        this.osProvider.iniciarAtendimento(url, this.ordemServico.ID_ORDEM_SERVICO, celNumber).subscribe(
          result => {
            this.ordemStartada =  true;
            this.ordemServico.DT_INICIO = JSON.parse(result).DT_INICIO;
            loader.dismiss();


            let toast = this.toastCtrl.create({
              message: 'Ordem de serviço iniciada com sucesso.',
              duration: 3000,
              position: 'top'
            });
            toast.present();

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

      })
  }



  salvarAtendimento(){

    if(this.ordemServico.DESCRICAO_ATENDIMENTO === null || this.ordemServico.DESCRICAO_ATENDIMENTO.match(/^ *$/) !== null || this.ordemServico.DT_INICIO == null ){
      let alert = this.alertCtrl.create({
        title: 'Erro ao Salvar',
        subTitle: (this.ordemServico.DT_INICIO == null ? 'Inicie o atendimento antes de solicitar o fechamento.<br>' : '') + (this.ordemServico.DESCRICAO_ATENDIMENTO === null || this.ordemServico.DESCRICAO_ATENDIMENTO.match(/^ *$/) !== null ? 'Descrição do atendimento é obrigatória.' : ''),
        buttons: ['OK']
      });
      alert.present();
    return;
    }


    var loader = this.loading.create({
      content: 'Solicitando Fechamento da Ordem de Serviço...',
    });

    loader.present();
    Promise.all([
      this.storage.get('url'),
      this.storage.get('celNumber'),
    ])
      .then(([url,celNumber]) => {
        this.osProvider.solicitarFechamentoOs(url, this.ordemServico.ID_ORDEM_SERVICO, this.ordemServico.DESCRICAO_ATENDIMENTO, this.ordemServico.MATERIAL_UTILIZADO,celNumber).subscribe(
          result => {
            this.ordemStartada =  true;
            this.ordemServico.DT_INICIO = JSON.parse(result).DT_INICIO;
            loader.dismiss();


            let toast = this.toastCtrl.create({
              message: 'Solicitação de fechamento realizada com sucesso.',
              duration: 3000,
              position: 'top'
            });
            toast.present();

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



/*
    this.storage.get('url').then((val) => {
      this.osProvider.solicitarFechamentoOs(val, this.ordemServico.ID_ORDEM_SERVICO, this.ordemServico.DESCRICAO_ATENDIMENTO, this.ordemServico.MATERIAL_UTILIZADO).subscribe(
        result => {
          this.ordemStartada =  true;
          this.ordemServico.DT_INICIO = JSON.parse(result).DT_INICIO;
          loader.dismiss();


          let toast = this.toastCtrl.create({
            message: 'Solicitação de fechamento realizada com sucesso.',
            duration: 3000,
            position: 'top'
          });
          toast.present();

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
    */

  }

  abrirRelDispositivo(id_dispositivo){
    console.log(id_dispositivo)
  }

}
