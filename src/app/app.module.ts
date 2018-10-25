import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';

import { CompromissoComponent } from '../components/compromisso/compromisso';
import { CardComponent } from '../components/card/card';

import { LoginPage } from '../pages/login/login';
import { CadastrarPage } from '../pages/cadastrar/cadastrar';
import { RecuperarSenhaPage } from '../pages/recuperar-senha/recuperar-senha';
import { AulaPage } from '../pages/aula/aula';
import { DisciplinasPage } from '../pages/disciplinas/disciplinas';
import { AddDisciplinasPage } from '../pages/add-disciplinas/add-disciplinas';
import { InfoCardPage } from '../pages/info-card/info-card';
import { EventosPage } from '../pages/eventos/eventos';
import { SettingsPage } from '../pages/settings/settings';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastrarPage,
    RecuperarSenhaPage,
    AulaPage,
    DisciplinasPage,
    AddDisciplinasPage,
    InfoCardPage,
    EventosPage,
    SettingsPage,
    
    CardComponent,
    CompromissoComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastrarPage,
    RecuperarSenhaPage,
    AulaPage,
    DisciplinasPage,
    AddDisciplinasPage,
    InfoCardPage,
    EventosPage,
    SettingsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {

  static injector: Injector;

    constructor(injector: Injector) {    
        // Make the injector to be available in the entire module
        AppModule.injector = injector;    
    }
}
