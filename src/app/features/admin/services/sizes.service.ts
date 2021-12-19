import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SizesService {

  constructor(
    private readonly http: HttpClient,
  ) { } 

  public addSizes(sizes: []): Observable<any> {
    return this.http.post<Observable<any>>(`${environment.rotanApiHost}/api/sizes/add`, sizes);
  }

  public getSizesBySku(sku: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.rotanApiHost}/api/sizes/${sku}`);
  }
}
