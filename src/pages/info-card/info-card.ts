import { User } from './../../providers/auth/user';
import { DBservices } from './../../providers/database/databaseservices';
import { Disciplina } from './../../providers/database/disciplina';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  dados: Disciplina;
  novaDisc: boolean;
  userId: string;
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbservices: DBservices) {
    this.dados = this.navParams.get('dados');
    this.novaDisc = this.navParams.get('novaDisc');
  }

  ionViewDidLoad() {
    // console.log(this.navParams.data)
    // //this.dados = this.navParams.data[0];
    // console.log(this.dados);
    // //this.novaDisc = this.navParams.data[1];
    // console.log(this.novaDisc)
  }

  addDisciplina(){
    this.userId = firebase.auth().currentUser.uid;
    this.dbservices.setAlunoDisciplina(this.userId, this.dados.nome);
  }

}
