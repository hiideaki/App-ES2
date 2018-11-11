import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CadastrarPage } from '../cadastrar/cadastrar';
import { RecuperarSenhaPage } from '../recuperar-senha/recuperar-senha';
import { DisableSideMenu } from '../../custom-decorators/disable-side-menu.decorator';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../providers/auth/user';
import { NgForm } from '@angular/forms';

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
  @ViewChild('form') form: NgForm;

  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
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

  // Precisa fazer validação dos campos
  login() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Carregando'
    })
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    })
    if(this.form.form.valid) {
      loading.present();
      this.authProvider.login(this.user)
      .then(() => {
        console.log('logado');
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      })
      .catch((err) => {
        loading.dismiss();
        switch(err.code) {
          case 'auth/user-disabled':
            toast.setMessage("Esta conta foi desabilitada");
            break;
          case 'auth/invalid-email':
            toast.setMessage("Endereço de e-mail inválido");
            break;
          case 'auth/user-not-found':
            toast.setMessage("Este usuário não existe");
            break;
          case 'auth/wrong-password':
          toast.setMessage("Senha incorreta");
            break;
          default:
            toast.setMessage(err.message);
        }
        toast.present();
      });
    } else {
      console.log("Preencha todos os campos");
    }
  }

}
