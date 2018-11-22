
import { User } from './../../providers/auth/user';
import { DBservices } from './../../providers/database/databaseservices';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingCmp, LoadingController } from 'ionic-angular';
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
  listaFiltrada = [];
  listaOrig = [];
  lista: Observable <any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbServices: DBservices, private loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Carregando'
    });
    loading.present().then(() => {
      // Pega todos os eventos
      this.lista = this.dbServices.getEventosTudo().valueChanges();    
      this.myInput = '';
  
      this.lista.subscribe((items : any[]) => {
        this.listaOrig = items;
        this.listaFiltrada = this.listaOrig;
      })
      loading.dismiss();
    })
  }

  onInput(e) {
    // Filtra os eventos de acordo com a entrada do usuário
    this.listaFiltrada = this.listaOrig.filter((item) => {  
      return item.nome.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1
        || item.palestrante.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1;
    })
    console.log(this.listaFiltrada)
  }

  pushPage(dados: Evento) {
    console.log(dados);
    this.navCtrl.push('InfoCardPage', { dados: dados, novaDisc: false, evento: true });
  }
  

}
