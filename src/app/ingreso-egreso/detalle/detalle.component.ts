import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { AppStateIngreEgre } from '../store/ingreso-egreso.reducer';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgreso[] | null = [];
  ingEgrSubs!: Subscription;

  constructor(
    private store: Store<AppStateIngreEgre>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.ingEgrSubs = this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => (this.ingresosEgresos = items));
  }

  ngOnDestroy(): void {
    this.ingEgrSubs.unsubscribe();
  }

  public borrarItem(item: string | undefined): void {
    this.ingresoEgresoService
      .borrarIngresoEgreso(item)
      .then(() => Swal.fire('Borrado!', 'Item Borrado', 'success'))
      .catch((err) => Swal.fire('Error', err, 'error'));
  }
}
