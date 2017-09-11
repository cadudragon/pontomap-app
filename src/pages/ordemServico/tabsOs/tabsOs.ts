import { Component } from '@angular/core';
import {OrdensServicoPage} from "../ordens-servico/ordens-servico";
@Component({
  selector: 'page-tabsOs',
  templateUrl: 'tabsOs.html',
})
export class TabsOsPage {

  ordensPage = OrdensServicoPage;
}
