import { Component, OnInit } from '@angular/core';

interface itemData {
  titulo: string;
  icon: string;
  url: string;
  cursor?: boolean;
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
      url: '',
    },
    {
      titulo: 'Ingresos y Egresos',
      icon: 'fa-clipboard-list',
      url: 'ingreso-egreso',
    },
    {
      titulo: 'Detalle',
      icon: 'fa-table',
      url: 'detalle',
    },
    {
      titulo: 'Cerrar sesión',
      icon: 'fa-sign-out-alt',
      url: 'login',
      cursor: true,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
