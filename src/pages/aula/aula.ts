import { Disciplina } from './../../providers/database/disciplina';
import { DBservices } from './../../providers/database/databaseservices';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public geolocation: Geolocation,
     private angularFirestore: AngularFirestore,
     private dbServices: DBservices,
     private loadingCtrl: LoadingController,
     private toastCtrl: ToastController) {
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
    } else {
      this.data.setTime(this.dados.comeco.seconds * 1000);
    }
    this.datastring = this.data.getDate() + '/' + (this.data.getMonth() + 1) + '/' + this.data.getFullYear();
  }
 
  loadMap(){
    let latLng = new google.maps.LatLng(this.dados.local._lat, this.dados.local._long);

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
  }

  addPresenca(){
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    })
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Carregando'
    })
    loading.present();

    let auxData = new Date();
    let agora = auxData.getHours();
    let ini = Number(this.dados.hora_inicio.substring(0, this.dados.hora_inicio.indexOf(':')));
    let fim = Number(this.dados.hora_fim.substring(0, this.dados.hora_fim.indexOf(':')));

    console.log(ini, fim, agora)
    if(agora < ini || agora >= fim) {
      loading.dismiss();
      toast.setMessage('Fora do período da aula');
      toast.present();
      return
    }

    this.geolocation.getCurrentPosition().then((position) => {
      console.log(position.coords.latitude, position.coords.longitude, this.dados.local._lat, this.dados.local._long)

      let distancia = this.getDistanceFromLatLonInKm(position.coords.latitude, position.coords.longitude, this.dados.local._lat, this.dados.local._long);
      console.log(distancia);
      if(distancia <= 0.3) {
        if(this.dados.disciplina) {
          this.dbServices.addPresencaAula(firebase.auth().currentUser.uid, this.data, this.dados.disciplina);
        } else {
          this.dbServices.addPresencaEvento(firebase.auth().currentUser.uid, this.dados.nome);
        }
        toast.setMessage('Presença cadastrada!');
      } else {
        toast.setMessage('Você está muito longe da sala de aula! Distância: ' + Math.round(distancia * 100000)/100 + 'm');
      }
      loading.dismiss();
      toast.present();
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
