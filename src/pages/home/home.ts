import { Aula } from './../../providers/database/aula';
import { Observable, Subscription } from 'rxjs';
import { DBservices } from './../../providers/database/databaseservices';
import { Component, NgModule } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CompromissoComponent } from '../../components/compromisso/compromisso';
import * as firebase from 'firebase/app';

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
  // Pega a data e formata como será mostrada
  auxData = new Date();
  dia = this.auxData.getDate();
  mes = this.auxData.getMonth() + 1;
  semana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  diaSemana = this.semana[this.auxData.getDay()];
  data = this.dia + '/' + this.mes + ' - ' + this.diaSemana; 
  
  //lista: Observable<any[]>;
  lista: [];
  listaOrig: any[];


  constructor(public navCtrl: NavController, private dbServices: DBservices) {
    this.adicionarLista(1, '10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%', 'Sala 7');
    this.adicionarLista(2, '14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '90.2%', 'Lepec');
    this.adicionarLista(3, '16:00', '18:00', 'Projeto de Trabalho de Conclusão de Curso', 'Simone', '100.0%', 'Lepec');
    this.adicionarLista(4, '19:00', '23:00', 'Ciência de Dados', 'João Pedro Albino', '100.0%', 'Lepec');

    // this.adicionarLista(1, '10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%', 'Sala 7');
    // this.adicionarLista(2, '14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '100.0%', 'Lepec');
   
    // this.adicionarLista(1, '10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%', 'Sala 7');
    // this.adicionarLista(2, '14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '100.0%', 'Lepec');
   
    // this.adicionarLista(1, '10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%', 'Sala 7');
    // this.adicionarLista(2, '14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '100.0%', 'Lepec');
   
    // this.adicionarLista(1, '10:00', '12:00', 'Engenharia de Software II', 'Wilson Masashiro Yonezawa', '88.4%', 'Sala 7');
    // this.adicionarLista(2, '14:00', '16:00', 'Banco de Dados II', 'Aparecido Nilceu Marana', '100.0%', 'Lepec');
    // console.log(this.lista)
  
    console.log(firebase.auth().currentUser.email);

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

  ionViewDidLoad(){
    //Meh talvez funcione
    // this.lista = this.dbServices.getAulas(firebase.auth().currentUser.uid).valueChanges();
    // this.lista.subscribe((items: any) => {
    //   this.listaOrig = items;
    // })
  }
}
