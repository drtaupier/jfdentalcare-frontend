import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const baseUrl = environment.baseUrl.replace(/\/+$/, '');
    const isBackendRequest = request.url.startsWith(`${baseUrl}/`);
    const path = isBackendRequest
      ? request.url.slice(baseUrl.length).split('?')[0]
      : '';

    const isLogin = path === '/login' || path === '/api/auth/login';
    const token = localStorage.getItem('token');

    if (isBackendRequest && !isLogin && token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    const sentToken = request.headers.get('Authorization');

    return next.handle(request).pipe(
      tap({
        error: (error) => {
          if (!isBackendRequest || isLogin) return;

          const currentToken = localStorage.getItem('token');
          const belongsToCurrentSession =
            !!currentToken && sentToken === `Bearer ${currentToken}`;

          if (!belongsToCurrentSession) return;

          if (error.status === 401) {
            localStorage.removeItem('token');
            this.router.navigateByUrl('/auth/login');
          } else if (
            error.status === 403 &&
            error.error?.error?.code === 'PASSWORD_CHANGE_REQUIRED'
          ) {
            this.router.navigateByUrl('/auth/change-password');
          }
        },
      }),
    );
  }
}
