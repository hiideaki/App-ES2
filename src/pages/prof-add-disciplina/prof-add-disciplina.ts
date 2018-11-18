import { DBservices } from './../../providers/database/databaseservices';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfAddDisciplinaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prof-add-disciplina',
  templateUrl: 'prof-add-disciplina.html',
})
export class ProfAddDisciplinaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbServices: DBservices) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfAddDisciplinaPage');
  }

  addDisciplina() {
    //this.dbServices.criaDisciplina(id, nome, docente); //olhe o db no para entender o "id"
  }

}
