import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CadastrarPage } from '../cadastrar/cadastrar';
import { RecuperarSenhaPage } from '../recuperar-senha/recuperar-senha';
import { DisableSideMenu } from '../../custom-decorators/disable-side-menu.decorator';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../providers/auth/User';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@DisableSideMenu()
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: User = new User();

  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider) {
    // Apagar depois
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Cadastrar', component: CadastrarPage },
      { title: 'Recuperar senha', component: RecuperarSenhaPage },
    ];
  }

  ionViewDidLoad() {
  }

  openPage(i) {
    this.navCtrl.setRoot(this.pages[i].component);
  }

  pushPage(i) {
    this.navCtrl.push(this.pages[i].component);
  }

  login() {
    this.authProvider.login(this.user)
      .then(() => {
        console.log('logado');
        this.navCtrl.setRoot(HomePage);
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
