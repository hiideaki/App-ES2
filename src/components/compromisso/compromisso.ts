import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AulaPage } from '../../pages/aula/aula';

/**
 * Generated class for the CompromissoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'compromisso',
  templateUrl: 'compromisso.html'
})
export class CompromissoComponent {

  @Input() item: any;

  constructor(public navCtrl: NavController) {
  }

  pushPage() {
    this.navCtrl.push(AulaPage, this.item);
  }

}
