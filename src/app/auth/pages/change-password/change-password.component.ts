import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  template: `
    <main class="password-page">
      <section>
        <h1>Change your password</h1>
        <p>Choose a new password to continue to your account.</p>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <label for="current-password">Current or temporary password</label>
          <input
            id="current-password"
            type="password"
            formControlName="currentPassword"
            autocomplete="current-password"
          />

          <label for="new-password">New password</label>
          <input
            id="new-password"
            type="password"
            formControlName="newPassword"
            autocomplete="new-password"
          />
          <p class="hint">
            Use at least 8 characters, including uppercase and lowercase
            letters, a number and a special character.
          </p>

          <label for="confirm-password">Confirm new password</label>
          <input
            id="confirm-password"
            type="password"
            formControlName="confirmation"
            autocomplete="new-password"
          />

          <p *ngIf="errorMessage" role="alert">{{ errorMessage }}</p>

          <button type="submit" [disabled]="isSubmitting">
            {{ isSubmitting ? 'Saving...' : 'Save new password' }}
          </button>
          <button type="button" (click)="logout()" [disabled]="isSubmitting">
            Sign out
          </button>
        </form>
      </section>
    </main>
  `,
  styles: [
    `
      .password-page {
        min-height: 80vh;
        display: grid;
        place-items: center;
        padding: 24px;
        background: #f4f7f8;
      }
      section {
        width: 100%;
        max-width: 460px;
        padding: 28px;
        box-sizing: border-box;
        background: white;
        border-radius: 16px;
      }
      label {
        display: block;
        margin: 18px 0 6px;
      }
      input {
        width: 100%;
        box-sizing: border-box;
        padding: 12px;
        border: 1px solid #9caeb3;
        border-radius: 8px;
      }
      .hint {
        font-size: 13px;
        color: #475569;
      }
      [role='alert'] {
        color: #b42318;
      }
      button {
        margin: 16px 8px 0 0;
        padding: 12px 16px;
        border-radius: 8px;
        cursor: pointer;
      }
      button:disabled {
        opacity: 0.6;
        cursor: wait;
      }
    `,
  ],
})
export class ChangePasswordComponent implements OnInit {
  isSubmitting = false;
  errorMessage = '';

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
