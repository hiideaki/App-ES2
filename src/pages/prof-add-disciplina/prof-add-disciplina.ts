import { DBservices } from './../../providers/database/databaseservices';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Disciplina } from '../../providers/database/disciplina';
import { User } from '../../providers/auth/user';
import { Aula } from '../../providers/database/aula';
import { NgForm } from '@angular/forms';

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
  aulas = [];
  local: any;

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


    console.log(this.aula);
    if(!this.aula.dia_semana || !this.aula.hora_inicio || !this.aula.hora_fim || !this.local) {
      toast.setMessage("Preencha todos os campos");
      toast.present();
      return;
    }


    let ini = Number(this.aula.hora_inicio.substring(0, this.aula.hora_inicio.indexOf(':')));
    let iniMin = Number(this.aula.hora_inicio.substring(this.aula.hora_inicio.indexOf(':') + 1, this.aula.hora_inicio.length));
    let fim = Number(this.aula.hora_fim.substring(0, this.aula.hora_fim.indexOf(':')));
    let fimMin = Number(this.aula.hora_fim.substring(this.aula.hora_fim.indexOf(':') + 1, this.aula.hora_fim.length));
    console.log(iniMin)
    console.log(fimMin)
    if(ini > fim || (ini == fim && iniMin > fimMin)) {
      toast.setMessage("O horário escolhido não é válido");
      toast.present();
      return;
    }

    for(var i = 0; i < this.aulas.length; i++) {
      if(this.aula.dia_semana == this.aulas[i].dia_semana) {
        let tempIni = Number(this.aulas[i].hora_inicio.substring(0, this.aulas[i].hora_inicio.indexOf(':')));
        let tempFim = Number(this.aulas[i].hora_fim.substring(0, this.aulas[i].hora_fim.indexOf(':')));
        if(ini <= tempFim && tempIni <= fim) {
          toast.setMessage("Há colisão de horários");
          toast.present();
          return;
        }
      }
    }
    
    this.aulas.push({
      dia_semana: this.aula.dia_semana,
      local: this.local.nome_local,
      hora_inicio: this.aula.hora_inicio,
      hora_fim: this.aula.hora_fim,
      long: this.local.long,
      lat: this.local.lat
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
      console.log('ok')
    } else {
      if(this.aulas.length == 0) {
        toast.setMessage('Insira pelo menos uma aula');
      } else {
        toast.setMessage('Preencha todos os campos')
      }
      toast.present();
    }
    //this.dbServices.criaDisciplina(id, nome, docente); //olhe o db no para entender o "id"
  }

}
