import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { DBservices } from './../../providers/database/databaseservices';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddDisciplinasPage } from '../add-disciplinas/add-disciplinas';
import { Disciplina } from '../../providers/database/disciplina';
import * as firebase from 'firebase/app'
import { User } from '../../providers/auth/user';

/**
 * Generated class for the DisciplinasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-disciplinas',
  templateUrl: 'disciplinas.html',
})
export class DisciplinasPage {
  lista: Observable<any[]>;
  // lista: any[];
  listaOrig: any[];
  

  constructor(public user: User, public navCtrl: NavController, public navParams: NavParams, private dbServices: DBservices, private afDB: AngularFireDatabase) {

  }


  ionViewDidLoad() {
    // Pega as disciplinas em que o usuário está matriculado
    this.lista = this.dbServices.getDisciplinasAluno(firebase.auth().currentUser.uid).snapshotChanges().map(items => {
      return items.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as Disciplina;
        return {id, ...data};
      })
    });
    this.lista.subscribe((items : any[]) => {
      this.listaOrig = items;
    })
  }

  addDisciplina() {
    this.navCtrl.push(AddDisciplinasPage);
  }

  pushPage(dados: Disciplina) {
    console.log(dados);
    this.navCtrl.push('InfoCardPage', { dados: dados, novaDisc: false, evento: false });

  }

}
