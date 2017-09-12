import { Injectable, forwardRef, Inject } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/map';;
import 'rxjs/add/operator/map';
import {LoginService} from "./login-service";
import {Rx} from "@reactivex/rxjs";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";


/*
  Generated class for the PontoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PontoProvider {

  private data: Date;
  private observable: Observable<any>

  loginService  : LoginService;
  usuarioLogado: any;
  constructor(
              private http: Http,
              @Inject(forwardRef(() => LoginService)) loginService: LoginService
               ) {
    this.loginService = loginService;
    this.usuarioLogado =  this.loginService.getUsuario();
  }

  getRegistrosDePonto(url){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'bearer ' + this.usuarioLogado.token );

     return this.http.get(url+'/api/ponto/GetPontoList', { headers: headers }).map(res => res.json());
  }



  iniciarAtendimento(url, id_ordem_servico, celNumber){

    var headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'bearer ' + this.usuarioLogado.token );

    var credentials = "id_ordem_servico=" + id_ordem_servico
      + "&ddd=" + celNumber.substring(0,2) +""
      + "&numero=" + celNumber.substring(2) + ""


    return this.http.post(url+'/api/os/iniciarOrdemServico', credentials, { headers: headers }).map(res => res.json());
  }


  solicitarFechamentoOs(url, id_ordem_servico, descricao_atendimento, material_utilizado, cellNumber){

    var headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'bearer ' + this.usuarioLogado.token );

    var credentials = "id_ordem_servico=" + id_ordem_servico
      + "&descricao_atendimento=" + descricao_atendimento +""
      + "&material_utilizado=" + material_utilizado + ""
      + "&ddd=" + cellNumber.substring(0,2) +""
      + "&numero=" + cellNumber.substring(2) + ""


    console.log(id_ordem_servico)
    console.log(headers)
    return this.http.post(url+'/api/os/solicitarFechamentoOs', credentials, { headers: headers }).map(res => res.json());
  }

  getOrdensServicoRel(url, id_dispositivo){

    var headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'bearer ' + this.usuarioLogado.token );

    var credentials = "?id_dispositivo=" + id_dispositivo
    return this.http.get(url+'/api/os/getOrdensServicoRel' + credentials, { headers: headers }).map(res => res.json());

  }
}
