import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
                private router: Router ){}
  
  canActivate(): Observable<boolean>| boolean {
    // console.log('ValidarTokenGuard: canActivate()');
    return this.authService.validarToken()
      .pipe(
        tap( valid => {
          // console.log('ValidarTokenGuard: canActivate() - valid:', valid);
          if( !valid ){
            this.router.navigateByUrl('/auth')
          }
        })
      )
    }

  canLoad(): Observable<boolean> | boolean {
    // console.log('ValidarTokenGuard: canLoad()');
    return this.authService.validarToken()
      .pipe(
        tap( valid => {
          // console.log('ValidarTokenGuard: canLoad() - valid:', valid);
          if( !valid ){
            this.router.navigateByUrl('/auth')
          }
        })
      )
    }
}
