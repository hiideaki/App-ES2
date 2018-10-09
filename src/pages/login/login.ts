import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pages = [
      { title: 'Home', component: HomePage },
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  openPage(i) {
    this.navCtrl.push(this.pages[i].component);
  }

}
