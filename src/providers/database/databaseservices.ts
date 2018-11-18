import { Aula } from './aula';
import { User } from './../auth/user';
import { Disciplina } from './disciplina';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { Observable, Subscription, Observer } from 'rxjs';


@Injectable()
export class DBservices {
  public DBRef: AngularFirestoreCollection<Disciplina>;
  public docRef: AngularFirestoreDocument;
  public IdDisciplina: Observable<string[]>;
  public IdAluno: Observable<string>;

  constructor(public angularFirestore: AngularFirestore) {
  }

  getListaTodasDisciplinas(): AngularFirestoreCollection <Disciplina> {
    return this.angularFirestore.collection(`disciplinas`);
  }

  getDisciplinasAluno(userId: string): AngularFirestoreCollection <Disciplina>{
    return this.angularFirestore.collection(`disciplinas`, ref => ref.where("alunos", "array-contains", userId));
  }

  getAulas(userId: string): AngularFirestoreCollection<Aula>{
    return this.angularFirestore.collection(`aula`, ref => ref.where('alunos', 'array-contains', userId));
}

  // getDetail(nome: string): firebase.firestore.DocumentReference {
  //   return this.DBRef.doc(nome); 
  // }

  getIdDisciplina(disciplina: string){
    this.DBRef = this.angularFirestore.collection(`disciplinas`, ref => ref.where ('nome', '==', disciplina));
    
    this.IdDisciplina = this.DBRef.snapshotChanges().map(disciplinas => {
      return disciplinas.map(a => {
        const id = a.payload.doc.id;
        return id;
      })
    });
    // this.query.subscribe(data => {
    //   data.map(dado => {
    //     this.id = dado;
    //     return this.id;
    //   })
    // })
  }
  
  getIdAluno(userId: string){
    this.docRef = this.angularFirestore.doc(`users/${userId}`);
    this.IdAluno = this.docRef.snapshotChanges().map(dados => {
      const data = dados.payload.data() as User;
      return data.nome;
    })
  }

  setAlunoDisciplina(userId: string, disciplina: string){
    this.getIdDisciplina(disciplina);
    this.getIdAluno(userId);
    
    this.IdAluno.subscribe(nomealuno => {
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
}