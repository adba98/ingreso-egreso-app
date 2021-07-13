import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { AppState } from '../app.state';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ui from '../shared/store/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css'],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoEgresoForm!: FormGroup;
  loadingSubs!: Subscription;
  tipo: string = 'ingreso';
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loadingSubs = this.store
      .select('ui')
      .subscribe(({ isLoading }) => (this.cargando = isLoading));
    this.ingresoEgresoForm = this.fb.group({
      desc: ['', Validators.required],
      monto: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  public guardar(): void {
    if (this.ingresoEgresoForm.invalid) return;
    this.store.dispatch(ui.isLoading());
    const { desc, monto } = this.ingresoEgresoForm.value;
    const ingresoEgreso = new IngresoEgreso(desc, monto, this.tipo);
    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoEgresoForm.reset();
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Registro creado', desc, 'success');
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }
}
