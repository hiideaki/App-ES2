import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { DisableSideMenu } from '../../custom-decorators/disable-side-menu.decorator';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth/user';
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
  confirmPw: string;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {

  }

  // Precisa fazer validação
  criarConta() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Carregando'
    });
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if(this.form.form.valid) {
      console.log('ok')
      loading.present();
      this.authProvider.createUser(this.user)
        .then((user: any) => {
          console.log("Usuário criado com sucesso");
          loading.dismiss();
          this.navCtrl.setRoot(HomePage);
        })
        .catch((err: any) => {
          loading.dismiss();
          switch(err.code) {
            case 'auth/email-already-in-use':
              toast.setMessage("Este e-mail já está sendo utilizado");
              break;
            case 'auth/invalid-email':
              toast.setMessage("Endereço de e-mail inválido");
              break;
            case 'auth/weak-password':
              toast.setMessage("Senha muito fraca");
              break;
            default:
              toast.setMessage(err.message);
          }
          toast.present();
        })
    } else {
      console.log('erro');
    }
  }

}
