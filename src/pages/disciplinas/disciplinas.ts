import { Component, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddDisciplinasPage } from '../add-disciplinas/add-disciplinas';
import { CardComponent } from '../../components/card/card';

/**
 * Generated class for the DisciplinasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()


@NgModule({
  declarations: [
    CardComponent,
  ]
})

@Component({
  selector: 'page-disciplinas',
  templateUrl: 'disciplinas.html',
})
export class DisciplinasPage {
  
  lista = [];
  

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

  addDisciplina() {
    this.navCtrl.push(AddDisciplinasPage);
  }

}
