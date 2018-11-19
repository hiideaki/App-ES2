import { AngularFireDatabase } from '@angular/fire/database';
import { DBservices } from '../../providers/database/databaseservices';
import { Observable } from 'rxjs';
import { Disciplina } from './../../providers/database/disciplina';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase/app';


/**
 * Generated class for the AddDisciplinasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-disciplinas',
  templateUrl: 'add-disciplinas.html',
})

export class AddDisciplinasPage {
  myInput: String;
  listaFiltrada = [];
  listaOrig = [];
  lista: Observable<any[]>;

  listaMinhasDisciplinas: Observable<any[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private dbServices: DBservices, private afDB: AngularFireDatabase) {

  }

  ionViewDidLoad(){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Carregando'
    });
    loading.present().then(() => {
      this.lista = this.dbServices.getListaTodasDisciplinas().valueChanges();
      this.myInput = '';

      this.lista.subscribe((items1 : any[]) => {
        this.lista = this.dbServices.getDisciplinasAluno(firebase.auth().currentUser.uid).valueChanges();
        this.lista.subscribe((items2 : any[]) => {
          this.listaOrig = [];
          console.log(items1, items2)
          for(let item1 of items1) {
            let ja = false;
            for(let item2 of items2) {
              if(item1.docente == item2.docente && item1.nome == item2.nome) {
                ja = true;
                break;
              }
            }
            if(!ja) {
              this.listaOrig.push(item1);
            }
          }
          this.listaFiltrada = this.listaOrig;
        })
        loading.dismiss();
      });
    });
  }

  onInput(e) {
    
    this.listaFiltrada = this.listaOrig.filter((item) => {  
      return item.nome.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1
        || item.docente.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1;
    });
  }

  pushPage(dados: Disciplina) {
    console.log(dados);
    this.navCtrl.push('InfoCardPage', { dados: dados, novaDisc: true, evento: false });

  }

}
