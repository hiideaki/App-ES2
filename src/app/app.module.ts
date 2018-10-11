import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFittextModule } from 'angular-fittext';

import { CompromissoComponent } from '../components/compromisso/compromisso';

import { LoginPage } from '../pages/login/login';
import { CadastrarPage } from '../pages/cadastrar/cadastrar';
import { RecuperarSenhaPage } from '../pages/recuperar-senha/recuperar-senha';
import { AulaPage } from '../pages/aula/aula';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    CadastrarPage,
    CompromissoComponent,
    RecuperarSenhaPage,
    AulaPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFittextModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    CadastrarPage,
    RecuperarSenhaPage,
    AulaPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
