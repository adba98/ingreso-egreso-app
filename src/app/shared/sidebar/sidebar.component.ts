import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface itemData {
  titulo: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
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

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {}

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
