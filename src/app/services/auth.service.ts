import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { User } from '../models/user';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore'
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ : Observable<firebase.User | null | undefined>;


  private userAuth !: User;




  constructor( private afAuth: AngularFireAuth, private afirestore : AngularFirestore, private afirestore2 :AngularFirestore ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user: firebase.User | null) => {
        if(user) {

          return this.afirestore.doc<firebase.User>('user/' + user.uid).valueChanges();
        }
        else {
          return of(null);
        }
      })
    );
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credentialIat = await this.afAuth.signInWithPopup(provider);

    return this.updateUserDate(credentialIat.user);

  }

  private updateUserDate(user : firebase.User | null) {
    if(user) {
          let userset : User = {
            displayName: user.displayName,
            email: user.email,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          uid: user.uid,
          tenantId: user.tenantId,
          providerId: user.providerId,
          refreshToken: user.refreshToken,
          isAnonymous: user.isAnonymous
          };

          this.userAuth = userset;


      const usero : Observable<User | undefined > = this.afirestore2.doc<User>('user/' + user.uid).valueChanges()

      const userRef: AngularFirestoreDocument<User> = this.afirestore2.doc<User>('user/' + user.uid);

     return userRef.set(userset);
    }
    else {
      return of(null);
    }
  }

  getUserAuthentifie () : User {
    return this.userAuth;
  }
}
