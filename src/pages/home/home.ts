import { Component, NgModule } from '@angular/core';
import { NavController, Loading, LoadingController } from 'ionic-angular';
import { CompromissoComponent } from '../../components/compromisso/compromisso';
import * as firebase from 'firebase/app';
import { MenuItemsProvider } from '../../providers/menu-items/menu-items';
import { User } from '../../providers/auth/user';
import { DBservices } from '../../providers/database/databaseservices';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AulaPage } from '../aula/aula';

@NgModule({
  declarations: [
    CompromissoComponent,
  ]
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // Pega a data e formata como será mostrada
  auxData = new Date();
  dia = this.auxData.getDate();
  mes = this.auxData.getMonth() + 1;
  semana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  diaSemana = this.semana[this.auxData.getDay()];
  data = this.dia + '/' + this.mes + ' - ' + this.diaSemana; 
  
  lista: Observable<any[]>;
  listaOrig = [];
  listaOrig1 = [];
  listaOrig2 = [];


  constructor(public navCtrl: NavController,
    public pages: MenuItemsProvider, 
    public user: User,
    private dbServices: DBservices,
    private angularFirestore: AngularFirestore,
    private loadingCtrl: LoadingController) {

    this.angularFirestore.doc(`users/${firebase.auth().currentUser.uid}`).ref.get().then(dado => {
      // Pega as informações do usuário que está logado
      this.user.cpf = dado.data().cpf;
      this.user.ocupacao = dado.data().ocupacao;
      this.user.nome = dado.data().nome;
      this.pages.setPages(this.user.ocupacao);
      this.pages.setUserInfo(user.nome)
    });

  }

  pushPage(item) {
    this.navCtrl.push(AulaPage, item);
  }

  ionViewDidLoad(){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Carregando'
    })
    loading.present();
    // Pega a data de hoje
    this.auxData
    let hoje = this.dia + '/' + this.auxData.getMonth() + '/' + this.auxData.getFullYear();

    // Pega as aulas que o usuário tem que comparecer
    this.lista = this.dbServices.getAulas(firebase.auth().currentUser.uid).valueChanges();
    this.lista.subscribe((items: any) => {
      this.listaOrig1 = [];
      // Verifica se a aula ocorre neste dia da semana
      for(var i = 0; i < items.length; i++) {
        if(items[i].dia_semana == this.diaSemana) {
          this.listaOrig1.push(items[i])
        }
      }

      // Pega todos os eventos em que o usuário se inscreveu
      this.lista = this.dbServices.getEventosAluno(firebase.auth().currentUser.uid).valueChanges();
      this.lista.subscribe((items: any) => {
        this.listaOrig2 = [];
        items.forEach(item => {
          let evento = new Date(item.comeco.seconds * 1000)
          let dataEvento = evento.getDate() + '/' + evento.getMonth() +  '/' + evento.getFullYear()
          // Verifica se o evento ocorre neste dia
          if(dataEvento == hoje)
            this.listaOrig2.push(item);
        })
        // Ordena os compromissos de acordo com a hora inicial
        this.listaOrig = this.listaOrig1.concat(this.listaOrig2).sort((a, b) => Number(a.hora_inicio.substring(0, a.hora_inicio.indexOf(':'))) < Number(b.hora_inicio.substring(0, b.hora_inicio.indexOf(':'))) ? -1 : Number(a.hora_inicio.substring(0, a.hora_inicio.indexOf(':'))) > Number(b.hora_inicio.substring(0, b.hora_inicio.indexOf(':'))) ? 1 : 0)
        
        let horaAgora = this.auxData.getHours() 
        let minutoAgora = this.auxData.getMinutes();
        // Verifica se o aluno já cadastrou presença na aula ou evento
        for(let item of this.listaOrig) {
          if(item.alunos_presentes) {
            let ja = false;
            for(let cod of item.alunos_presentes) {
              if(cod == firebase.auth().currentUser.uid) {
                ja = true;
                item.presencaOk = true;
                break;
              }
            }
            if(!ja) {
              item.presencaOk = null;
            }
          } else {
            item.presencaOk = null;
          }

          let horaFim = Number(item.hora_fim.substring(0, item.hora_fim.indexOf(':')))
          let minutoFim = Number(item.hora_fim.substring(item.hora_fim.indexOf(':') + 1, item.hora_fim.length))

          if(horaAgora > horaFim || (horaAgora == horaFim && minutoAgora > minutoFim)) {
            item.finalizado = true;
          } else {
            item.finalizado = null;
          }


        }
        
        loading.dismiss();
      })
    })
  }
}
