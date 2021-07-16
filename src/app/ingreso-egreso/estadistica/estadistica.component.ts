import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MultiDataSet, Label } from 'ng2-charts';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { AppStateIngreEgre } from '../store/ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css'],
})
export class EstadisticaComponent implements OnInit {
  ingresos: number = 0;
  egresos: number = 0;
  totalIngresos: number = 0;
  totalEgresos: number = 0;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];

  constructor(private store: Store<AppStateIngreEgre>) {}

  ngOnInit(): void {
    this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => this.generarEstadistica(items));
  }

  public generarEstadistica(items: IngresoEgreso[] | null): void {
    for (const item of items!) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    }
    this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];
  }
}
