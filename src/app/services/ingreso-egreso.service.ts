import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  public crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user!.uid;
    delete ingresoEgreso.uid;
    return this.firestore
      .doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }
}
