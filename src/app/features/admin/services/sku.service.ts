import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SkuService {
  constructor(
    private readonly http: HttpClient,
  ) {
  }

  public addSku(sku: any): Observable<any> {
    return this.http.post<Observable<any>>(`${environment.rotanApiHost}/api/parent-sku/add`, sku);
  };

  public getSkuList(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.rotanApiHost}/api/parent-sku`);
  };

  public deleteSkuById(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.rotanApiHost}/api/parent-sku/${id}`);
  }
}
