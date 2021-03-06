import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngreso',
})
export class OrdenIngresoPipe implements PipeTransform {
  transform(items: IngresoEgreso[] | null): IngresoEgreso[] {
    return items!.slice().sort((a) => {
      if (a.tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
