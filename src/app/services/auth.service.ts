import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  public async crearUsuario(nombre: string, email: string, password: string) {
    const { user } = await this.auth
      .createUserWithEmailAndPassword(email, password);
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
      console.log(fuser);
    });
  }

  public isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(map((fbUser) => fbUser != null));
  }
}
