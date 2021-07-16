import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.state';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems } from '../ingreso-egreso/store/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubs!: Subscription;
  ingEgrSubs!: Subscription;
  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.userSubs = this.store
      .select('user')
      .pipe(filter((auth) => auth.user !== null))
      .subscribe(({ user }) => {
        this.ingEgrSubs = this.ingresoEgresoService
          .initIngresoEgresoListener(user!.uid)
          .subscribe((ingresosEgresosFB: any) => {
            this.store.dispatch(setItems({ items: ingresosEgresosFB }));
          });
      });
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
    this.ingEgrSubs?.unsubscribe();
  }
}
