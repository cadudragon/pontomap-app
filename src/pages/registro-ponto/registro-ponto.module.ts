import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroPonto } from './registro-ponto';

@NgModule({
  declarations: [
    RegistroPonto,
  ],
  imports: [
    IonicPageModule.forChild(RegistroPonto),
  ],
  exports: [
    RegistroPonto
  ]
})
export class RegistroPontoModule {}
