import { AddDisciplinasPageModule } from './../pages/add-disciplinas/add-disciplinas.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { CompromissoComponent } from '../components/compromisso/compromisso';

import { LoginPage } from '../pages/login/login';
import { CadastrarPage } from '../pages/cadastrar/cadastrar';
import { RecuperarSenhaPage } from '../pages/recuperar-senha/recuperar-senha';
import { AulaPage } from '../pages/aula/aula';
import { DisciplinasPage } from '../pages/disciplinas/disciplinas';
import { AddDisciplinasPage } from '../pages/add-disciplinas/add-disciplinas';
import { InfoCardPage } from '../pages/info-card/info-card';
import { EventosPage } from '../pages/eventos/eventos';
import { SettingsPage } from '../pages/settings/settings';

import { AuthProvider } from '../providers/auth/auth';
import { DBservices } from '../providers/database/databaseservices';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfAddDisciplinaPage } from '../pages/prof-add-disciplina/prof-add-disciplina';
import { User } from '../providers/auth/user';
import { MenuItemsProvider } from '../providers/menu-items/menu-items';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

var firebaseConfig = {
  apiKey: "AIzaSyCMM3RGIGCkGl9GhJn_Y4GFhY__3zjDd80",
  authDomain: "unesp-esii-1540422166847.firebaseapp.com",
  databaseURL: "https://unesp-esii-1540422166847.firebaseio.com",
  projectId: "unesp-esii-1540422166847",
  storageBucket: "unesp-esii-1540422166847.appspot.com",
  messagingSenderId: "130150402224"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastrarPage,
    RecuperarSenhaPage,
    AulaPage,
    DisciplinasPage,
    // AddDisciplinasPage,
    // InfoCardPage,
    EventosPage,
    SettingsPage,
    ProfAddDisciplinaPage,

    // CompromissoComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    AddDisciplinasPageModule,
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
    EventosPage,
    SettingsPage,
    ProfAddDisciplinaPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DBservices,
    AngularFireDatabase,
    User,
    MenuItemsProvider,
    AndroidPermissions,
    ScreenOrientation,
  ]
})

export class AppModule {

  static injector: Injector;

    constructor(injector: Injector) {    
        // Make the injector to be available in the entire module
        AppModule.injector = injector;    
    }
}
