export class Login{
  constructor( idLogin : string, nome:string, token:string){
    this._idLogin = idLogin;
    this._nome = nome;
    this._token = token;
  }

  private _idLogin:string = "";
  get idLogin():string {
    return this._idLogin;
  }
  set idLogin(idLogin:string) {
    this._idLogin = idLogin;
  }

  private _token:string = "";
  get token():string {
    return this._token;
  }
  set token(token: string){
    this._token = token;
  }

  private _nome:string = "";
  get nome():string {
    return this._nome;
  }
  set nome(nome:string){
    this._nome = nome;
  }
}

