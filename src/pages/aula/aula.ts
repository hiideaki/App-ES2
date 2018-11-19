import { Disciplina } from './../../providers/database/disciplina';
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
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
  
      this.mapa = new google.maps.Map(this.elementoMapa.nativeElement, mapOptions);
    }, (err) => {
      console.log(err);
    });
  }

  addPresenca(){
    if(this.dados.Disciplina)
      this.dbServices.addPresencaAula(firebase.auth().currentUser.uid, this.data, this.dados.disciplina);
    else
      this.dbServices.addPresencaEvento(firebase.auth().currentUser.uid, this.dados.nome);
  }

}
