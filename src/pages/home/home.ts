import { Component, NgModule } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CompromissoComponent } from '../../components/compromisso/compromisso'

@NgModule({
  declarations: [
    CompromissoComponent,
  ]
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  dia = '18';
  mes = 'Setembro';
  diaSemana = 'Terça-feira';

  lista = [];
  

  constructor(public navCtrl: NavController) {
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
}
