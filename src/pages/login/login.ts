import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CadastrarPage } from '../cadastrar/cadastrar';
import { RecuperarSenhaPage } from '../recuperar-senha/recuperar-senha';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Cadastrar', component: CadastrarPage },
      { title: 'Recuperar senha', component: RecuperarSenhaPage },
    ];
  }

  ionViewDidLoad() {
  }

  openPage(i) {
    // this.navCtrl.setRoot(this.pages[i].component);
    this.navCtrl.push(this.pages[i].component);
  }

}
