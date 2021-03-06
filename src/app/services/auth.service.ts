import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as authActions from '../auth/store/auth.actions';
import * as itemActions from '../ingreso-egreso/store/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubscription!: Subscription;
  private _user: Usuario | null | undefined;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  public async crearUsuario(nombre: string, email: string, password: string) {
    const { user } = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const usuraio = new Usuario(user!.uid, nombre, email);
    return await this.firestore.doc(`${user!.uid}/usuario`).set({ ...usuraio });
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  public signOut(): Promise<void> {
    return this.auth.signOut();
  }

  public initAuthListener(): void {
    this.auth.authState.subscribe((fuser) => {
      if (fuser) {
        this.userSubscription = this.firestore
          .doc(`${fuser.uid}/usuario`)
          .valueChanges()
          .subscribe((fsUser) => {
            const user = Usuario.fromFirebase(fsUser);
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }));
          });
      } else {
        this._user = null;
        if (this.userSubscription !== undefined) {
          this.userSubscription.unsubscribe();
        }
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(itemActions.unSetItems());
      }
    });
  }

  public isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(map((fbUser) => fbUser != null));
  }

  public get user() {
    return this._user;
  }
}
