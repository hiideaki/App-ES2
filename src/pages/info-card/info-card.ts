import { Disciplina } from './../../providers/database/disciplina';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InfoCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-card',
  templateUrl: 'info-card.html',
})
export class InfoCardPage {

  dados: Disciplina;
  novaDisc: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dados = this.navParams.get('dados');
    this.novaDisc = this.navParams.get('novaDisc');
  }

  ionViewDidLoad() {
    console.log(this.navParams.data)
    //this.dados = this.navParams.data[0];
    console.log(this.dados);
    //this.novaDisc = this.navParams.data[1];
    console.log(this.novaDisc)
  }

}
