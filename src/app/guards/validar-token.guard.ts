import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  private checkAccess(): Observable<boolean | UrlTree> {
    return this.authService.validarToken().pipe(
      map((valid) => {
        if (!valid) {
          return this.router.createUrlTree(['/auth/login']);
        }

        if (this.authService.mustChangePassword) {
          return this.router.createUrlTree(['/auth/change-password']);
        }

        return true;
      }),
    );
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.checkAccess();
  }

  canLoad(): Observable<boolean | UrlTree> {
    return this.checkAccess();
  }
}
