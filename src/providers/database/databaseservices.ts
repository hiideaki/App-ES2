import { Aula } from './aula';
import { User } from './../auth/user';
import { Disciplina } from './disciplina';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Evento } from './evento';


@Injectable()
export class DBservices {
  data = new Date();
  public DBRef: AngularFirestoreCollection<Disciplina>;
  public docRef: AngularFirestoreDocument;
  public IdDisciplina: Observable<string[]>;
  public IdEvento: Observable<string[]>;
  public NomeAluno: Observable<string>;
  public IdAula: Observable<string[]>;

  constructor(public angularFirestore: AngularFirestore) {
  }

  getListaTodasDisciplinas(): AngularFirestoreCollection <Disciplina> {
    return this.angularFirestore.collection(`disciplinas`);
  }

  getDisciplinasAluno(userId: string): AngularFirestoreCollection <Disciplina>{
    return this.angularFirestore.collection(`disciplinas`, ref => ref.where("alunos", "array-contains", userId));
  }

  getAulas(userId: string): AngularFirestoreCollection<Aula>{
    return this.angularFirestore.collection(`aula`, ref => ref.where('alunos', 'array-contains', userId).where('fim', '>=', this.data));
  }

  getEventosTudo(): AngularFirestoreCollection <Evento> {
    return this.angularFirestore.collection(`eventos`);
  }
  
  getAulaDisciplina(disciplina: string) {
    return this.angularFirestore.collection(`aula`, ref => ref.where("disciplina", "==", disciplina));
  }

  getIdDisciplina(disciplina: string){
    this.DBRef = this.angularFirestore.collection(`disciplinas`, ref => ref.where ('nome', '==', disciplina));
    
    this.IdDisciplina = this.DBRef.snapshotChanges().map(disciplinas => {
      return disciplinas.map(a => {
        const id = a.payload.doc.id;
        return id;
      })
    });
  }
  
  getNomeAluno(userId: string){
    this.docRef = this.angularFirestore.doc(`users/${userId}`);
    this.NomeAluno = this.docRef.snapshotChanges().map(dados => {
      const data = dados.payload.data() as User;
      return data.nome;
    })
  }

  setAlunoDisciplina(userId: string, disciplina: string){
    this.getIdDisciplina(disciplina);
    this.getNomeAluno(userId);
    
    this.NomeAluno.subscribe(nomealuno => {
      this.IdDisciplina.subscribe(data => {
        data.map(disciplinaId => {
          this.addAluno(userId, disciplinaId);
          this.addAlunoAula(userId, disciplinaId);
        })
      })
    })
  }

  addAluno(userId: string, disciplinaId: string){
    firebase.firestore().doc(`disciplinas/${disciplinaId}`).update({
      alunos: firebase.firestore.FieldValue.arrayUnion(userId)
    });
  }

  addAlunoAula(userId: string, disciplinaId: string){
    this.angularFirestore.collection(`aula`, ref => ref.where('disciplina', '==', disciplinaId)).get().subscribe(dado => {
      dado.forEach(data => {
        firebase.firestore().doc(`aula/${data.id}`).update({
          alunos: firebase.firestore.FieldValue.arrayUnion(userId)
        })
      })
    })
  }

  criaDisciplina(id: string, nome: string, docente: string){
    firebase.firestore().doc(`/disciplinas/${id}`).set({
      nome: nome,
      docente: docente
    })
  }
  
  criaAula(disciplina: string, docente: string, hora_inicio: string, hora_fim: string, fim: Date, local: firebase.firestore.GeoPoint, nome_local: string, dia_semana: string){
    firebase.firestore().collection(`aula`).add({
      disciplina: disciplina,
      docente: docente,
      hora_inicio: hora_inicio,
      hora_fim: hora_fim,
      fim: fim,
      local: local,
      nome_local: nome_local,
      dia_semana: dia_semana,
    })  
  }

  setAlunoEvento(userId: string, evento: string) {
    this.getIdEvento(evento);
    this.getNomeAluno(userId);
    
    this.NomeAluno.subscribe(nomealuno => {
      this.IdEvento.subscribe(data => {
        data.map(eventoId => {
          firebase.firestore().doc(`eventos/${eventoId}`).update({
            alunos: firebase.firestore.FieldValue.arrayUnion(userId)
          });
        })
      })
    })
  }

  getEventosAluno(userId: string) {
    return this.angularFirestore.collection(`eventos`, ref => ref.where('alunos', 'array-contains', userId).where('comeco', '>=', this.data));
  }

  getIdEvento(evento: string){
    this.DBRef = this.angularFirestore.collection(`eventos`, ref => ref.where ('nome', '==', evento));
    
    this.IdEvento = this.DBRef.snapshotChanges().map(evento => {
      return evento.map(a => {
        const id = a.payload.doc.id;
        return id;
      })
    });
  }

  getIdAula(disciplina: string, data: Date) { 
    this.DBRef = this.angularFirestore.collection(`aula`, ref => ref.where('disciplina', '==', disciplina).where('fim', '==', data));
    this.IdAula = this.DBRef.snapshotChanges().map(aula => {
      return aula.map(a => {
        const id = a.payload.doc.id;
        return id;
      })
    })
  }

  addPresencaAula(userId: string, data: Date, disciplina: string) {
    this.getIdAula(disciplina, data);

    this.IdAula.subscribe(dado => {
      dado.map(aulaId => {
        firebase.firestore().doc(`aula/${aulaId}`).update({
          alunos_presentes: firebase.firestore.FieldValue.arrayUnion(userId)
        })
      })
    })
  }

  addPresencaEvento(userId: string, evento: string) {
    this.getIdEvento(evento);

    this.IdEvento.subscribe(dado => {
      dado.map(eventoId => {
        firebase.firestore().doc(`eventos/${eventoId}`).update({
          alunos_presentes: firebase.firestore.FieldValue.arrayUnion(userId)
        });
      })
    })
  }
}
