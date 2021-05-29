import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('token');
    let newRequest: HttpRequest<any>;
    newRequest = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    });
    return next.handle(newRequest).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status == 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
          this.toastrService.error("Lütfen yeniden giriş yapınız.");
          throw new Error('Jwt expired!');
        }
        if(error.error.message){
          return throwError(error.error.message)
        }else{
          return throwError(error.error)
        }
      })
    );
  }
}
