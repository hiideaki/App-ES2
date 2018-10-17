import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDisciplinasPage } from './add-disciplinas';

@NgModule({
  declarations: [
    AddDisciplinasPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDisciplinasPage),
  ],
})
export class AddDisciplinasPageModule {}
