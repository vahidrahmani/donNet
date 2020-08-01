import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.currentUserValue && this.auth.currentUserValue.token}`
      }
    });
    return next.handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
          //if (event instanceof HttpResponse) {
          
          //} 
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.auth.logout();
                location.reload(true);
              // redirect to the login route
            }
          }
        })
      )
   
  }
}
