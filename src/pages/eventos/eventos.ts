import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  myInput: String;
  lista = [];
  listaFiltrada = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.adicionarLista(1, '08/11', '10h00', '12h00', 'IA nos tênis', 'Bill Gates', 'Guilhermão');
    this.adicionarLista(2, '25/12', '00h01', '23h59', 'Natal', 'Papai Noel', 'Osasco');

    this.listaFiltrada = this.lista
  }

  ionViewDidLoad() {
    
  }
  
  adicionarLista(vId, vData, vHoraIni, vHoraFim, vTitulo, vPalestrante, vLocal) {
    this.lista.push({
      id: vId,
      data: vData,
      horaIni: vHoraIni,
      horaFim: vHoraFim,
      titulo: vTitulo,
      palestrante: vPalestrante,
      local: vLocal
    });
  }

  onInput(e) {
    this.listaFiltrada = this.lista.filter((item) => {  
      return item.titulo.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1
        || item.palestrante.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1;
    })
  }
  

}
