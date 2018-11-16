import { AngularFireDatabase } from '@angular/fire/database';
import { DBservices } from '../../providers/database/databaseservices';
import { Observable } from 'rxjs';
import { Disciplina } from './../../providers/database/disciplina';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


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
  listaFiltrada: any[];
  listaOrig: any[];
  lista: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbServices: DBservices, private afDB: AngularFireDatabase) {
    /*this.adicionarLista(1, '10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%', 'Sala 7');
    this.adicionarLista(2, '14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '100.0%', 'Lepec');
   
    this.adicionarLista(1, '10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%', 'Sala 7');
    this.adicionarLista(2, '14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '100.0%', 'Lepec');
   
    this.adicionarLista(1, '10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%', 'Sala 7');
    this.adicionarLista(2, '14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '100.0%', 'Lepec');
   
    this.adicionarLista(1, '10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%', 'Sala 7');
    this.adicionarLista(2, '14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '100.0%', 'Lepec');
   
    this.adicionarLista(1, '10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%', 'Sala 7');
    this.adicionarLista(2, '14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '100.0%', 'Lepec');
    console.log(this.lista);
    this.listaFiltrada = this.lista;*/
    
  }

  ionViewDidLoad(){
    this.lista = this.dbServices.getListaTodasDisciplinas().valueChanges();
    this.myInput = '';

    this.lista.subscribe((items : any[]) => {
      this.listaOrig = items;
      this.listaFiltrada = this.listaOrig;
    });

    // this.lista.subscribe((items : any[]) => {
    //   this.listaFiltrada = items.filter((item) => {  
    //        return item.nome.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1
    //          || item.docente.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1
    //     })
    //   });
  }




  onInput(e) {
    console.log(this.myInput)
    this.listaFiltrada = this.listaOrig.filter((item) => {  
      return item.nome.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1
        || item.docente.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1;
    });
    console.log(this.listaFiltrada);
  }

  goToInfoCard(dados: Disciplina): void{
    this.navCtrl.push('InfoCardPage', { dados: dados});
  }

}
