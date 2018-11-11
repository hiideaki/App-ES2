import { Disciplina } from './disciplina';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'


@Injectable()
export class DBservices {
  public DBRef: firebase.firestore.CollectionReference;
  constructor(public angularFirestore: AngularFirestore) {
  }

  getListaTodasDisciplinas(): AngularFirestoreCollection <Disciplina> {
      return this.angularFirestore.collection(`disciplinas`);
  }

  getList(): firebase.firestore.CollectionReference {
    return this.DBRef;
  }

  getDetail(nome: string): firebase.firestore.DocumentReference {
    return this.DBRef.doc(nome); 
  }

}