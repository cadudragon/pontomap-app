import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {TabsPage} from "../pages/ordemServico/tabsOs/tabs";
import {TabsOsPage} from "../pages/ordemServico/tabsOs/tabsOs";
import {OrdensServicoPage} from "../pages/ordemServico/ordens-servico/ordens-servico";
import {OrdemServicoPage} from "../pages/ordemServico/ordem-servico/ordem-servico";
import  {OrdensServicoRelPage} from "../pages/ordemServico/ordens-servico-rel/ordens-servico-rel";
import { LoginService } from '../providers/login-service';
import  {ordemServicoService} from "../services/ordem-servico-service";
import {OrdemServicoProvider} from "../providers/ordem-servico-provider";
import {OrdemServicoRelPage} from "../pages/ordemServico/ordem-servico-rel/ordem-servico-rel";



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabsOsPage,
    OrdemServicoPage,
    OrdensServicoPage,
    OrdensServicoRelPage,
    OrdemServicoRelPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsOsPage,
    OrdemServicoPage,
    OrdensServicoPage,
    OrdensServicoRelPage,
    OrdemServicoRelPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginService,
    ordemServicoService,
    OrdemServicoProvider
  ]
})
export class AppModule {

}
