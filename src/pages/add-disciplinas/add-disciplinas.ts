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
  lista = [];
  listaFiltrada = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.adicionarLista(1, '10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%', 'Sala 7');
    this.adicionarLista(2, '14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '100.0%', 'Lepec');
   
    this.adicionarLista(1, '10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%', 'Sala 7');
    this.adicionarLista(2, '14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '100.0%', 'Lepec');
   
    this.adicionarLista(1, '10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%', 'Sala 7');
    this.adicionarLista(2, '14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '100.0%', 'Lepec');
   
    this.adicionarLista(1, '10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%', 'Sala 7');
    this.adicionarLista(2, '14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '100.0%', 'Lepec');
   
    this.adicionarLista(1, '10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%', 'Sala 7');
    this.adicionarLista(2, '14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '100.0%', 'Lepec');
    console.log(this.lista)
    this.listaFiltrada = this.lista
  }

  adicionarLista(vId, vHoraIni, vHoraFim, vMateria, vProfessor, vFrequencia, vLocal) {
    this.lista.push({
      id: vId,
      horaIni: vHoraIni,
      horaFim: vHoraFim,
      materia: vMateria,
      professor: vProfessor,
      frequencia: vFrequencia,
      local: vLocal
    });
  }
  
  ionViewDidLoad() {
    
  }

  onInput(e) {
    this.listaFiltrada = this.lista.filter((item) => {  
      return item.materia.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1
        || item.professor.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1;
    })
  }


}
