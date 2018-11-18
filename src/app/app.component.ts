import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../providers/auth/user';
import { DBservices } from '../providers/database/databaseservices';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuItemsProvider } from '../providers/menu-items/menu-items';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  constructor(public platform: Platform,
     public statusBar: StatusBar,
     public splashScreen: SplashScreen, 
     private authProvider: AuthProvider, 
     private afAuth: AngularFireAuth, 
     public user: User,
     public pages: MenuItemsProvider) {
       
    const authObserver = afAuth.authState.subscribe((user) => {
      if(user) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
      authObserver.unsubscribe();
    })
   
    this.initializeApp();


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
