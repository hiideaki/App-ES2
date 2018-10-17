import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InfoCardPage } from '../../pages/info-card/info-card';


/**
 * Generated class for the CardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'card',
  templateUrl: 'card.html'
})
export class CardComponent {

  @Input() item: any;
  
  // icone está interpolado com '<ion-icon name="{{ icone }}"></ion-icon>'
  @Input() icone: string;

  

  constructor(public navCtrl: NavController) {
  }


  pushPage() {
    this.navCtrl.push(InfoCardPage, this.item);
  }


}
