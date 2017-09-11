import{OrdemServico} from "../models/ordemServico";

export class ordemServicoService{
  private ordensServico :OrdemServico [] = [];

  addOrdem(ordemServico : OrdemServico){
    this.ordensServico.push(ordemServico);
  }

  addOrdens(itens:OrdemServico []){
    this.ordensServico.push(... itens)
  }

  getOrdensServico(){
    return this.ordensServico.slice();
  }

  deletarOrdem(index: number){
    this.ordensServico.splice(index, 1);
  }
}
