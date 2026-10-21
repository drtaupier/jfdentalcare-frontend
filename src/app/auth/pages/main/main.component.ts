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
  errorMessage = '';

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
      next: (response) => {
        this.isSubmitting = false;
        this.miFormulario.get('password')?.reset();

        const destination = response.must_change_password
          ? '/auth/change-password'
          : '/dashboard';

        this.router.navigateByUrl(destination);
      },
      error: (error) => {
        this.isSubmitting = false;

        const code = error.error?.error?.code;

        if (code === 'ACCOUNT_TEMPORARILY_LOCKED') {
          this.errorMessage =
            'Your account is temporarily locked. Please try again in 15 minutes.';
        } else if (code === 'TEMPORARY_PASSWORD_EXPIRED') {
          this.errorMessage =
            'Your temporary password has expired. Contact technical support.';
        } else if (error.status === 0 || error.status === 503) {
          this.errorMessage =
            'The service is currently unavailable. Please try again later.';
        } else {
          this.errorMessage = 'Invalid username or password. Please try again.';
        }

        this.miFormulario.setErrors({ authError: true });
      },
    });
  }

  getYear(): number {
    return new Date().getFullYear();
  }
}
