import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public loginUsuario(): void {
    if (this.loginForm.invalid) return;
    Swal.fire({
      title: 'Validando informacion...',
      didOpen: () => Swal.showLoading(),
    });
    const { email, password } = this.loginForm.value;
    this.authService
      .loginUsuario(email, password)
      .then(() => {
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch((err) =>
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message,
        })
      );
  }
}
