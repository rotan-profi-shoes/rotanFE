import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private readonly http: HttpClient,
  ) {
  }

  public getOrderList(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.rotanApiHost}/api/order`);
  }
}
