import { DBservices } from './../../providers/database/databaseservices';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Disciplina } from '../../providers/database/disciplina';
import { User } from '../../providers/auth/user';
import { Aula } from '../../providers/database/aula';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase/app';
import { HomePage } from '../home/home';

/**
 * Generated class for the ProfAddDisciplinaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prof-add-disciplina',
  templateUrl: 'prof-add-disciplina.html',
})
export class ProfAddDisciplinaPage {
  @ViewChild('form') form: NgForm;
  disciplina: Disciplina = new Disciplina();
  idDisciplina: string;
  aula: Aula = new Aula();
  semana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  diaSemana: number;
  aulas = [];
  local: any;

  hojeString = new Date().toISOString();
  dataIni = this.hojeString;
  dataFim: any;

  locals = [{nome_local: "Sala 5", lat: -22.350737, long: -49.03219},
            {nome_local: "Lepec", lat: -22.351284, long: -49.033726}]
  
  selectOptionsDiaSemana = {
    title: 'Dia da semana',
    mode: 'md'
  };

  selectOptionsLocal = {
    title: 'Local',
    mode: 'md'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbServices: DBservices, private user: User, private toastCtrl: ToastController) {
    
  }

  ionViewDidLoad() {
  }

  pushAula() {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    })


    if(!this.diaSemana || !this.aula.hora_inicio || !this.aula.hora_fim || !this.local) {
      toast.setMessage("Preencha todos os campos");
      toast.present();
      return;
    }


    let ini = Number(this.aula.hora_inicio.substring(0, this.aula.hora_inicio.indexOf(':')));
    let iniMin = Number(this.aula.hora_inicio.substring(this.aula.hora_inicio.indexOf(':') + 1, this.aula.hora_inicio.length));
    let fim = Number(this.aula.hora_fim.substring(0, this.aula.hora_fim.indexOf(':')));
    let fimMin = Number(this.aula.hora_fim.substring(this.aula.hora_fim.indexOf(':') + 1, this.aula.hora_fim.length));

    if(ini > fim || (ini == fim && iniMin > fimMin)) {
      toast.setMessage("O horário escolhido não é válido");
      toast.present();
      return;
    }

    for(var i = 0; i < this.aulas.length; i++) {
      if(this.semana[this.diaSemana] == this.aulas[i].dia_semana) {
        let tempIni = Number(this.aulas[i].hora_inicio.substring(0, this.aulas[i].hora_inicio.indexOf(':')));
        let tempFim = Number(this.aulas[i].hora_fim.substring(0, this.aulas[i].hora_fim.indexOf(':')));
        if(ini < tempFim && tempIni < fim || ini == tempIni && fim == tempFim) {
          toast.setMessage("Há colisão de horários");
          toast.present();
          return;
        }
      }
    }

    let hoje = new Date();
    let diferenca = this.diaSemana - hoje.getDay();
    if (diferenca < 0)
      diferenca = 7 + diferenca;
    let data = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + diferenca, fim, fimMin, 0, 0);

    
    this.aulas.push({
      dia_semana: this.semana[this.diaSemana],
      local: this.local.nome_local,
      hora_inicio: this.aula.hora_inicio,
      hora_fim: this.aula.hora_fim,
      long: this.local.long,
      lat: this.local.lat,
      data: data
    });
  }

  remove(i) {
    this.aulas.splice(i, 1);
  }

  addDisciplina() {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    })
    if(this.form.form.valid && this.aulas.length > 0) {
      
      this.dbServices.criaDisciplina(this.idDisciplina, this.disciplina.nome, this.user.nome); //olhe o db no para entender o "id"
      for(var item of this.aulas) {
        this.dbServices.criaAula(this.idDisciplina, this.user.nome, item.hora_inicio, item.hora_fim, item.data, new firebase.firestore.GeoPoint(item.lat, item.long), item.local, item.dia_semana)
      }
      toast.setMessage("Disciplina criada com sucesso!");
      toast.present();
      this.navCtrl.setRoot(HomePage)
    } else {
      if(this.aulas.length == 0) {
        toast.setMessage('Insira pelo menos uma aula');
      } else {
        toast.setMessage('Preencha todos os campos')
      }
      toast.present();
    }
  }

}
