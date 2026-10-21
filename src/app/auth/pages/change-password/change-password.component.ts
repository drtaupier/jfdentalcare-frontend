import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  isSubmitting = false;
  errorMessage = '';
  showPasswords = false;
  year = new Date().getFullYear();

  // Continúa aquí tu formulario y los métodos existentes.
  // Continúa aquí tu formulario y los métodos existentes.

  form = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[\s\S]+$/,
        ),
      ],
    ],
    confirmation: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.validarToken().subscribe((valid) => {
      if (!valid) {
        this.authService.logout();
      }
    });
  }

  submit(): void {
    if (this.isSubmitting) return;
    this.errorMessage = '';
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.errorMessage =
        'Complete all fields and meet the password requirements.';
      return;
    }

    const { currentPassword, newPassword, confirmation } =
      this.form.getRawValue();

    if (newPassword !== confirmation) {
      this.errorMessage = 'The new passwords do not match.';
      return;
    }

    this.isSubmitting = true;
    this.authService.changePassword(currentPassword!, newPassword!).subscribe({
      next: () => {
        this.form.reset();
        this.authService.logout();
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage =
          typeof error.error?.error === 'string'
            ? error.error.error
            : 'Unable to change your password. Please try again.';
      },
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
