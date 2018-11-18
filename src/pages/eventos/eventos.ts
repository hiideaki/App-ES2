
import { User } from './../../providers/auth/user';
import { DBservices } from './../../providers/database/databaseservices';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Evento } from '../../providers/database/evento';

/**
 * Generated class for the EventosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage {
  usuario: User;
  myInput: String;
  lista: Observable <any[]>;
  // lista = [];
  listaFiltrada = [];
  listaOrig = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbServices: DBservices) {
    // this.adicionarLista(1, '08/11', '10h00', '12h00', 'IA nos tênis', 'Bill Gates', 'Guilhermão');
    // this.adicionarLista(2, '25/12', '00h01', '23h59', 'Natal', 'Papai Noel', 'Osasco');

    // this.listaFiltrada = this.lista

    // console.log(this.listaFiltrada)
  }

  ionViewDidLoad() {
    this.lista = this.dbServices.getEventosTudo().valueChanges();    
    this.myInput = '';

    this.lista.subscribe((items : any[]) => {
      this.listaOrig = items;
        this.listaFiltrada = this.listaOrig;
    })
  }
  
  // adicionarLista(vId, vData, vHoraIni, vHoraFim, vTitulo, vPalestrante, vLocal) {
  //   this.lista.push({
  //     id: vId,
  //     data: vData,
  //     horaIni: vHoraIni,
  //     horaFim: vHoraFim,
  //     titulo: vTitulo,
  //     palestrante: vPalestrante,
  //     local: vLocal
  //   });
  // }

  onInput(e) {
    this.listaFiltrada = this.listaOrig.filter((item) => {  
      return item.nome.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1
        || item.palestrante.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1;
    })
  }

  pushPage(dados: Evento) {
    console.log(dados);
    this.navCtrl.push('InfoCardPage', { dados: dados, novaDisc: false, evento: true });
  }
  

}
