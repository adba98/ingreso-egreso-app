import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css'],
})
export class IngresoEgresoComponent implements OnInit {
  ingresoEgresoForm!: FormGroup;
  tipo: string = 'ingreso';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ingresoEgresoForm = this.fb.group({
      desc: ['', Validators.required],
      monto: ['', Validators.required],
    });
  }

  public guardar(): void {
    console.log(this.ingresoEgresoForm.value);
  }
}
