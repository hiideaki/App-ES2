import { NgModule } from '@angular/core';
import { CompromissoComponent } from './compromisso/compromisso';
import { CardComponent } from './card/card';

@NgModule({
	declarations: [
		CompromissoComponent,
    CardComponent,
	],
	imports: [],
	exports: [
		CompromissoComponent,
    CardComponent
	]
})
export class ComponentsModule {}
