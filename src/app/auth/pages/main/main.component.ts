import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  showPassword = false;
  isSubmitting = false;

  miFormulario: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    // Elimina el error anterior para permitir un nuevo intento.
    this.miFormulario.setErrors(null);
    this.miFormulario.markAllAsTouched();

    if (this.miFormulario.invalid) {
      return;
    }

    this.isSubmitting = true;

    const { username, password } = this.miFormulario.value;

    this.authService.login({ username, password }).subscribe({
      next: (token) => {
        this.isSubmitting = false;

        if (token) {
          this.router.navigateByUrl('/dashboard');
          return;
        }

        this.miFormulario.setErrors({ authError: true });
      },
      error: (error) => {
        console.log('Error en la autenticación', error);
        this.isSubmitting = false;
        this.miFormulario.setErrors({ authError: true });
      },
    });
  }

  getYear(): number {
    return new Date().getFullYear();
  }
}
