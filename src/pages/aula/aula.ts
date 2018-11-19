import { DBservices } from './../../providers/database/databaseservices';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as firebase from 'firebase/app';

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
  alvo: any;
  dados: any;
  dadosDisciplina: any;
  data = new Date();
  datastring: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, private angularFirestore: AngularFirestore, private dbServices: DBservices) {
  }


  ionViewDidLoad(){
    console.log(this.navParams.data)
    this.dados = this.navParams.data;
    this.loadMap();
    if (this.dados.disciplina){
      this.data.setTime(this.dados.fim.seconds * 1000);
      this.angularFirestore.doc(`disciplinas/${this.dados.disciplina}`).ref.get().then(data => {
        this.dadosDisciplina = data.data().nome;
      })
    }
    else {
      this.data.setTime(this.dados.comeco.seconds * 1000);
    }
    this.datastring = this.data.getDate() + '/' + (this.data.getMonth() + 1) + '/' + this.data.getFullYear();
  }
 
  loadMap(){
    // Para pegar as coordenadas do local use
    // this.dados.local._lat e this.dados.local._long
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
  
      this.mapa = new google.maps.Map(this.elementoMapa.nativeElement, mapOptions);

      this.alvo = new google.maps.Marker({
        position: {lat: this.dados.local._lat, lng: this.dados.local._long},
        map: this.mapa,
        title: 'Aula'

      });
    
    }, (err) => {
      console.log(err);
    });
  }

  addPresenca(){
    this.geolocation.getCurrentPosition().then((position) => {
      console.log(position.coords.latitude, position.coords.longitude, this.dados.local._lat, this.dados.local._long)

      let distancia = this.getDistanceFromLatLonInKm(position.coords.latitude, position.coords.longitude, this.dados.local._lat, this.dados.local._long);
      console.log(distancia);
      if(distancia <= 0.3) {
        this.dbServices.addPresenca(firebase.auth().currentUser.uid, this.data, this.dados.disciplina);
        console.log("Presença cadastrada");
      } else {
        console.log("Você está muito longe!");
      }
    })
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

}
