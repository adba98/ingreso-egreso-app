import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { ingresoEgresoReducer } from './store/ingreso-egreso.reducer';
import { OrdenIngresoPipe } from '../pipes/orden-ingreso-pipe.pipe';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    DashboardComponent,
    DetalleComponent,
    EstadisticaComponent,
    IngresoEgresoComponent,
    OrdenIngresoPipe,
  ],
  imports: [
    ChartsModule,
    CommonModule,
    DashboardRoutesModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
  ],
})
export class IngresoEgresoModule {}
