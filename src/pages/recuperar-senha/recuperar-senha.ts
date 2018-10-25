import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DisableSideMenu } from '../../custom-decorators/disable-side-menu.decorator';

/**
 * Generated class for the RecuperarSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@DisableSideMenu()
@IonicPage()
@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html',
})
export class RecuperarSenhaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarSenhaPage');
  }

}
