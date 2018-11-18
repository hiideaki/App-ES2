import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { DBservices } from './../../providers/database/databaseservices';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddDisciplinasPage } from '../add-disciplinas/add-disciplinas';
import { Disciplina } from '../../providers/database/disciplina';
import * as firebase from 'firebase/app'

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
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbServices: DBservices, private afDB: AngularFireDatabase) {
    // this.adicionarLista(1, 'Engenharia de Software II', 'Wilson Masashiro Yonezawa');
    // this.adicionarLista(2, 'Banco de Dados II', 'Aparecido Nilceu Marana');
    /*
    this.adicionarLista(1, '10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%', 'Sala 7');
    this.adicionarLista(2, '14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '100.0%', 'Lepec');
   
    this.adicionarLista(1, '10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%', 'Sala 7');
    this.adicionarLista(2, '14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '100.0%', 'Lepec');
   
    this.adicionarLista(1, '10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%', 'Sala 7');
    this.adicionarLista(2, '14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '100.0%', 'Lepec');
   
    this.adicionarLista(1, '10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%', 'Sala 7');
    this.adicionarLista(2, '14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '100.0%', 'Lepec');
    console.log(this.lista)*/
  }

  // adicionarLista(vId, vMateria, vProfessor) {
  //   this.lista.push({
  //     id: vId,
  //     nome: vMateria,
  //     docente: vProfessor,
  //   });
  // }

  ionViewDidLoad() {
    this.lista = this.dbServices.getDisciplinasAluno(firebase.auth().currentUser.uid).valueChanges();
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
