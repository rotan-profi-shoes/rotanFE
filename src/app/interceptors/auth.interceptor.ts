import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GeneralSelectors } from '../store/general.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly store: Store,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const addToken = request.clone({
      headers: request.headers.set('auth-token', this.store.selectSnapshot(GeneralSelectors.getToken)),
    });

    return next.handle(addToken);
  }
}
