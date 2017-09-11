export class OrdemServico{

  constructor(){}

  private _dtAbertura:string = "";
  get dtAbertura():string {
    return this._dtAbertura;
  }
  set dtAbertura(dtAbertura:string) {
    this.dtAbertura = dtAbertura;
  }

  private _solicitante:string = "";
  get solicitante():string {
    return this._solicitante;
  }
  set solicitante(solicitante:string) {
    this._solicitante = solicitante;
  }

  private _local:string = "";
  get local():string {
    return this._local;
  }
  set local(local:string) {
    this._local = local;
  }

  private _dispositivo:string = "";
  get dispositivo():string {
    return this._dispositivo;
  }
  set dispositivo(dispositivo:string) {
    this._dispositivo = dispositivo;
  }

  private _defeito:string = "";
  get defeito():string {
    return this._defeito;
  }
  set defeito(defeito:string) {
    this._defeito = defeito;
  }

  private _dtInicio:string = "";
  get dtInicio():string {
    return this._dtInicio;
  }
  set dtInicio(dtInicio:string) {
    this._dtInicio = dtInicio;
  }

  private _dtFim:string = "";
  get dtFim():string {
    return this._dtFim;
  }
  set dtFim(dtFim:string) {
    this._dtFim = dtFim;
  }

  private _descAtendimento:string = "";
  get descAtendimento():string {
    return this._descAtendimento;
  }
  set descAtendimento(descAtendimento:string) {
    this._descAtendimento = descAtendimento;
  }

  private _materialUtilizado:string = "";
  get materialUtilizado():string {
    return this._materialUtilizado;
  }
  set materialUtilizado(materialUtilizado:string) {
    this._materialUtilizado = materialUtilizado;
  }
}
