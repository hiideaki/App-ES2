import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    
  }

  resetPassword() {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    })
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Carregando'
    })
    if(this.form.form.valid) {
      loading.present();
      this.authProvider.resetPassword(this.userEmail)
      .then(() => {
        console.log("Solicitação de reset de senha");
        loading.dismiss();
        this.navCtrl.setRoot(LoginPage);
      })
      .catch((err) => {
        loading.dismiss();
        switch(err.code) {
          case 'auth/invalid-email':
            toast.setMessage("Endereço de e-mail inválido");
            break;
          case 'auth/user-not-found':
            toast.setMessage("Este usuário não existe");
            break;
          default:
            toast.setMessage(err.message);
        }
        toast.present();
      });
    } else {
      toast.setMessage("Preencha todos os campos");
      toast.present();
    }
  }

}
