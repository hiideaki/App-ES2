import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoCardPage } from './info-card';

@NgModule({
  declarations: [
    InfoCardPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoCardPage),
  ],
})
export class InfoCardPageModule {}
