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
    this.adicionarLista('10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%');
    this.adicionarLista('14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '100.0%');
    console.log(this.lista)
  }

  adicionarLista(vHoraIni, vHoraFim, vMateria, vProfessor, vFrequencia) {
    this.lista.push({
      horaIni: vHoraIni,
      horaFim: vHoraFim,
      materia: vMateria,
      professor: vProfessor,
      frequencia: vFrequencia
    });
  }
  


}
