import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DisableSideMenu } from '../../custom-decorators/disable-side-menu.decorator';
import { AuthProvider } from '../../providers/auth/auth';
import { Form, NgForm } from '@angular/forms';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RecuperarSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@DisableSideMenu()
@IonicPage()
@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html',
})
export class RecuperarSenhaPage {
  @ViewChild('form') form: NgForm;

  userEmail: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    
  }

  resetPassword() {
    if(this.form.form.valid) {
      this.authProvider.resetPassword(this.userEmail)
      .then(() => {
        console.log("Solicitação de reset de senha");
        this.navCtrl.setRoot(LoginPage);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

}
