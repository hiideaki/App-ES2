import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './user';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class AuthProvider {
  user: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user = angularFireAuth.authState;
  }

  createUser(user: User): Promise <void>{
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(
      newUserCredential => {
        firebase.firestore().doc(`/users/${newUserCredential.user.uid}`).set({
          nome: user.nome,
          cpf: user.cpf
        })
      }).catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  login(user: User) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  signOut() {
    return this.angularFireAuth.auth.signOut();
  }

  resetPassword(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }
}
