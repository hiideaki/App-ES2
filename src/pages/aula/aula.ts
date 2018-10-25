import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

/**
 * Generated class for the AulaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aula',
  templateUrl: 'aula.html',
})
export class AulaPage {

  @ViewChild('mapa') elementoMapa: ElementRef;
  mapa: any;
  dados: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
  }


  ionViewDidLoad(){
    console.log(this.navParams.data)
    this.dados = this.navParams.data;
    this.loadMap();
  }
 
  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
  
      this.mapa = new google.maps.Map(this.elementoMapa.nativeElement, mapOptions);
    }, (err) => {
      console.log(err);
    });
  }

}
