import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public authentificate(user: any): Observable<any> {
    return this.http.post<Observable<any>>(`${environment.rotanApiHost}/api/user/login`, user);
  }
}
