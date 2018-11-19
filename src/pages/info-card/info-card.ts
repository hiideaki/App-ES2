import { User } from './../../providers/auth/user';
import { DBservices } from './../../providers/database/databaseservices';
import { Disciplina } from './../../providers/database/disciplina';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase/app';

/**
 * Generated class for the InfoCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-card',
  templateUrl: 'info-card.html',
})
export class InfoCardPage {

  dados: any;
  novaDisc: boolean;
  evento: boolean;
  userId: string;
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbservices: DBservices, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.dados = this.navParams.get('dados');
    this.novaDisc = this.navParams.get('novaDisc');
    this.evento = this.navParams.get('evento');
  }

  ionViewDidLoad() {
    
  }

  addDisciplina(){
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      message: 'Disciplina adicionada'
    })
    console.log(this.dados.nome);
    console.log(this.userId);
    this.userId = firebase.auth().currentUser.uid;
    this.dbservices.setAlunoDisciplina(this.userId, this.dados.nome);
    toast.present();
    this.navCtrl.pop();

  }

  addEvento() {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      message: 'Evento adicionado'
    })
    console.log(this.dados.nome);
    console.log(this.userId);
    this.userId = firebase.auth().currentUser.uid;
    this.dbservices.setAlunoEvento(this.userId, this.dados.nome);
    toast.present();
    this.navCtrl.pop();
  }

}
