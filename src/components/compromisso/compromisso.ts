import { Component, Input } from '@angular/core';

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

  constructor() {
    console.log('Dentro de compromisso.ts: ' + this.item);
    
  }

}
