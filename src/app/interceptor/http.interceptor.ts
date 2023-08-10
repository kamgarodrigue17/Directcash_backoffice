import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable()
export class HttpInterceptore implements HttpInterceptor {

  constructor(public global:AuthServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
 this.global.refreshToken();
//console.log(localStorage.getItem("token"))
  const authRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }

  });
    

    
    return  next.handle(authRequest);
  }
}
