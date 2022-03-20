import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SizesService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public addSizes(sizes: []): Observable<any> {
    return this.http.post<Observable<any>>(`${environment.rotanApiHost}/api/sizes/add`, sizes);
  };

  public addSize(size: any): Observable<any> {
    return this.http.post<Observable<any>>(`${environment.rotanApiHost}/api/sizes/add-one`, size);
  };

  public updateSize(id: string, size: any): Observable<any> {
    return this.http.put<Observable<any>>(`${environment.rotanApiHost}/api/sizes/update-one/${id}`, size);
  };

  public getSize(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.rotanApiHost}/api/sizes/find-one/${id}`);
  };

  public getSizesById(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.rotanApiHost}/api/sizes/${id}`);
  };

  public deleteSizesBySku(sku: string): Observable<any> {
    return this.http.delete<any>(`${environment.rotanApiHost}/api/sizes/${sku}`);
  };

  public deleteSizesById(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.rotanApiHost}/api/sizes/delete-one/${id}`);
  };
}
