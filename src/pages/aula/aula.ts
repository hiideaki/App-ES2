import { Disciplina } from './../../providers/database/disciplina';
import { DBservices } from './../../providers/database/databaseservices';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as firebase from 'firebase/app';
import { AndroidPermissions } from '@ionic-native/android-permissions';

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
  local: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public geolocation: Geolocation,
     private angularFirestore: AngularFirestore,
     private dbServices: DBservices,
     private androidPermissions: AndroidPermissions,
     private platform: Platform,
     private loadingCtrl: LoadingController,
     private toastCtrl: ToastController) {


     }


  ionViewDidLoad(){
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    })

    if(this.platform.is('cordova')) {
      // Verifica se o app possui permissão para usar geolocalização
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then((result) => {
        this.local = result.hasPermission;
        if(!this.local) {
          toast.setMessage("O aplicativo não pode cadastrar sua presença pois não possui permissões de localização!");  
          toast.present();
        }
      })
    }

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
    
    if(this.dados.presencaOk) {
      toast.setMessage("Sua presença já foi computada");
      toast.present();
    }
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
    let agoraHora = auxData.getHours();
    let agoraMin = auxData.getMinutes();
    let ini = Number(this.dados.hora_inicio.substring(0, this.dados.hora_inicio.indexOf(':')));
    let fim = Number(this.dados.hora_fim.substring(0, this.dados.hora_fim.indexOf(':')));
    let iniMin = Number(this.dados.hora_inicio.substring(this.dados.hora_inicio.indexOf(':') + 1, this.dados.hora_inicio.length));
    let fimMin = Number(this.dados.hora_fim.substring(this.dados.hora_fim.indexOf(':') + 1, this.dados.hora_fim.length));

    console.log(ini, fim, agoraHora)
    if(agoraHora < ini || agoraHora > fim || (agoraHora == ini && agoraMin < iniMin) || (agoraHora == fim && agoraMin > fimMin)) {
      loading.dismiss();
      toast.setMessage('Fora do período');
      toast.present();
      return
    }


    this.cadastrarPresenca(toast, loading)
  }

  cadastrarPresenca(toast, loading) {
    this.geolocation.getCurrentPosition().then((position) => {
      let distancia = this.getDistanceFromLatLonInKm(position.coords.latitude, position.coords.longitude, this.dados.local._lat, this.dados.local._long);

      if(distancia <= 0.1) {
        if(this.dados.disciplina) {
          this.dbServices.addPresencaAula(firebase.auth().currentUser.uid, this.data, this.dados.disciplina);
        } else {
          this.dbServices.addPresencaEvento(firebase.auth().currentUser.uid, this.dados.nome);
        }
        toast.setMessage('Presença cadastrada!');
      } else {
        toast.setMessage('Você está muito longe da sala! Distância: ' + Math.round(distancia * 100000)/100 + 'm');
      }
      loading.dismiss();
      toast.present();
    })
    .catch((err) => alert(err.message))

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