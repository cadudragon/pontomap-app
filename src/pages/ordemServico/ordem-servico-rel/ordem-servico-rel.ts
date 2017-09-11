import {Component} from '@angular/core';

import {
   NavParams
} from "ionic-angular";




@Component({
  selector: 'page-ordem-servico-rel',
  templateUrl: 'ordem-servico-rel.html',
})

export class OrdemServicoRelPage {


  ordemServico : any;
    constructor(private  navParams: NavParams){

    }


  ngOnInit(){
    this.ordemServico = this.navParams.data;
    console.log(this.ordemServico)
  }



}


