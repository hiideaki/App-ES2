import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
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
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

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
     public pages: MenuItemsProvider,
     private loadingCtrl: LoadingController,
     private androidPermissions: AndroidPermissions,
     private screenOrientation: ScreenOrientation) {
    
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Carregando'
    });

    loading.present();
    const authObserver = afAuth.authState.subscribe((user) => {
      if(user) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
      authObserver.unsubscribe();
      loading.dismiss();
    })
   
    this.initializeApp();


  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')) {
        // Trava orientação do dispositivo para ficar em modo 'retrato'
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

        // Checa e, se necessário, requisita permissão para usar localização do dispositivo
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then((result) => {
          if(!result.hasPermission) {
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
          }
        })
      }

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
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
