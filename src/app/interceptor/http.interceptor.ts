import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';
import { AdminService } from '../services-v2/admin-plateforme/admin.service';

@Injectable()
export class HttpInterceptore implements HttpInterceptor {

  constructor(public global: AuthServiceService,
    private _userService: AdminService
  ) {
    // this.global.refreshToken();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //console.log(localStorage.getItem("token"))
    const authRequest = request.clone({
      setHeaders: {
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': 'http://localhost:4200',
        Authorization: `Bearer ${this._userService.getLocalUser()?.token || ""}`
      }
    });



    return next.handle(authRequest);
  }
}
