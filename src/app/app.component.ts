import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DisciplinasPage } from '../pages/disciplinas/disciplinas';
import { EventosPage } from '../pages/eventos/eventos';
import { SettingsPage } from '../pages/settings/settings';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private authProvider: AuthProvider, private afAuth: AngularFireAuth) {
    const authObserver = afAuth.authState.subscribe((user) => {
      if(user) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
      authObserver.unsubscribe();
    })
   
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Disciplinas', component: DisciplinasPage },
      { title: 'Eventos', component: EventosPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  settings() {
    this.nav.push(SettingsPage);
  }

  logout() {
    this.authProvider.signOut()
      .then(() => {
        this.nav.setRoot(LoginPage);
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
