import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Subject, merge, timer } from 'rxjs';
import {
  catchError,
  finalize,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Message, Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  usuario?: Usuario;
  messages: Message[] = [];
  search = '';
  loading = true;
  menuOpen = false;
  errorMessage = '';
  openingId: number | null = null;
  lastUpdated: Date | null = null;
  today = new Date();

  private refresh$ = new Subject<void>();
  private destroyed$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  get canManageUsers(): boolean {
    return ['OWNER', 'ADMIN', 'TECH_SUPPORT'].includes(
      this.usuario?.user_role || '',
    );
  }

  get displayName(): string {
    return this.usuario?.display_name || this.usuario?.firstname || 'Welcome';
  }

  get roleLabel(): string {
    const labels: Record<string, string> = {
      OWNER: 'Owner',
      ADMIN: 'Administrator',
      TECH_SUPPORT: 'Technical support',
      MANAGER: 'Office manager',
      USER: 'Staff',
    };

    return labels[this.usuario?.user_role || ''] || 'Staff';
  }

  get receivedToday(): number {
    const today = new Date().toDateString();

    return this.messages.filter(
      (message) => new Date(message.fecha_mensaje).toDateString() === today,
    ).length;
  }

  get filteredMessages(): Message[] {
    const query = this.search.trim().toLowerCase();

    return this.messages.filter((message) =>
      [message.firstname, message.lastname, message.email, message.phone].some(
        (value) =>
          String(value || '')
            .toLowerCase()
            .includes(query),
      ),
    );
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.authService.logout();
      return;
    }

    // getUserData consulta /api/auth/me; el ID ya no se utiliza.
    this.authService
      .getUserData(token, 0)
      .pipe(
        tap((response) => {
          this.usuario = response.usuario;
        }),
        switchMap(() =>
          merge(
            timer(0, 300000),
            this.refresh$,
            this.authService.messageUpdated$,
          ).pipe(
            switchMap(() => {
              this.loading = true;
              this.errorMessage = '';

              return this.authService.getMessages().pipe(
                tap((messages) => {
                  this.messages = [...messages].sort(
                    (a, b) =>
                      new Date(b.fecha_mensaje).getTime() -
                      new Date(a.fecha_mensaje).getTime(),
                  );
                  this.lastUpdated = new Date();
                }),
                catchError(() => {
                  this.errorMessage =
                    'Unable to load requests. Please try refreshing.';
                  return EMPTY;
                }),
                finalize(() => {
                  this.loading = false;
                }),
              );
            }),
          ),
        ),
        takeUntil(this.destroyed$),
      )
      .subscribe({
        error: () => {
          this.loading = false;
          this.errorMessage =
            'Unable to load your profile. Please sign in again or retry.';
        },
      });
  }

  refresh(): void {
    if (!this.loading && this.usuario) {
      this.refresh$.next();
    }
  }

  getId(messageId: number): void {
    if (this.openingId !== null) return;

    const token = localStorage.getItem('token');
    if (!token) {
      this.authService.logout();
      return;
    }

    this.openingId = messageId;
    this.errorMessage = '';

    this.authService
      .getMessage(token, messageId)
      .pipe(
        takeUntil(this.destroyed$),
        finalize(() => {
          this.openingId = null;
        }),
      )
      .subscribe({
        next: (message) => {
          this.authService.sendingMessage(message);
          this.router.navigate(['/dashboard/message']);
        },
        error: () => {
          this.errorMessage = 'Unable to open this request. Please try again.';
        },
      });
  }

  trackMessage(_index: number, message: Message): number {
    return message.message_id;
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.refresh$.complete();
  }
}
