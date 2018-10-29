import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DisableSideMenu } from '../../custom-decorators/disable-side-menu.decorator';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth/User';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the CadastrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@DisableSideMenu()
@IonicPage()
@Component({
  selector: 'page-cadastrar',
  templateUrl: 'cadastrar.html',
})
export class CadastrarPage {
  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider) {
  }

  ionViewDidLoad() {

  }

  // Precisa fazer validação
  criarConta() {
    console.log("Criando conta");
    if(this.form.form.valid) {
      this.authProvider.createUser(this.user)
        .then((user: any) => {
          console.log("Usuário criado com sucesso");
          this.navCtrl.setRoot(HomePage);
        })
        .catch((err: any) => {
          console.log(err);
        })
    } else {
      
    }
  }

}
