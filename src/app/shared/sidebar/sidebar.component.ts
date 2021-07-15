import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

interface itemData {
  titulo: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  items: itemData[] = [
    {
      titulo: 'Dashboard',
      icon: 'fa-tachometer-alt',
    },
    {
      titulo: 'Ingresos y Egresos',
      icon: 'fa-clipboard-list',
    },
    {
      titulo: 'Detalle',
      icon: 'fa-table',
    },
    {
      titulo: 'Cerrar sesión',
      icon: 'fa-sign-out-alt',
    },
  ];
  userName: string | undefined = '';
  userSubs!: Subscription;

  constructor(
    private router: Router,
    private auth: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userSubs = this.store
      .select('user')
      .pipe(filter(({ user }) => user != null))
      .subscribe(({ user }) => (this.userName = user?.nombre));
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  public itemClick(tituloItem: any): void {
    switch (tituloItem) {
      case this.items[0].titulo:
        this.router.navigate(['']);
        return;
      case this.items[1].titulo:
        this.router.navigate(['/ingreso-egreso']);
        return;
      case this.items[2].titulo:
        this.router.navigate(['/detalle']);
        return;
      case this.items[3].titulo:
        this.auth.signOut().then(() => this.router.navigate(['/login']));
        return;
    }
  }
}
