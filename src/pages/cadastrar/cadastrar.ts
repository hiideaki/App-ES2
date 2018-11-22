import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { DisableSideMenu } from '../../custom-decorators/disable-side-menu.decorator';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth/user';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

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
      // Verifica se as senhas batem
      if(this.user.password != this.confirmPw) {
        toast.setMessage("As senhas estão diferentes!");
        toast.present();
        return;
      }

      // Verifica se o cpf inserido é valido
      if(!this.validaCPF(this.user.cpf)) {
        toast.setMessage("CPF inválido");
        toast.present();
        return;
      }

      loading.present();
      // Tenta criar o usuário
      this.authProvider.createUser(this.user)
        .then((user: any) => {
          toast.setMessage("Usuário criado com sucesso!");
          toast.present();
          loading.dismiss();
          this.navCtrl.setRoot(HomePage);
        })
        .catch((err: any) => {
          // Tratamento dos erros
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
      // Caso os campos não estejam todos preenchidos corretamente
      toast.setMessage("Preencha todos os campos corretamente");
      toast.present();
    }
  }

  validaCPF(nCPF) {
    var cpf = nCPF.toString();
    var soma;
    var resto;
    soma = 0;
    if (cpf == "00000000000") return false;
     
    for (let i=1; i<=9; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
   
    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != Number(cpf.substring(9, 10))) return false;
   
    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
   
    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false;
    return true;
  }

}
