import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShoesService {

  constructor(
    private readonly http: HttpClient,
  ) { } 

  public getShoesList(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.rotanApiHost}/api/shoes`);
  }

  public addShoes(shoes: any): Observable<any> {
    return this.http.post<Observable<any>>(`${environment.rotanApiHost}/api/shoes/add`, shoes);
  }

  public getGenderTypesList(): Observable<any> {
    return this.http.get<Observable<any>>(`${environment.rotanApiHost}/api/shoes/gender-types`);
  }

  public getFormTypesList(): Observable<any> {
    return this.http.get<Observable<any>>(`${environment.rotanApiHost}/api/shoes/form-types`);
  }

  public getShoesClassTypesList(): Observable<any> {
    return this.http.get<Observable<any>>(`${environment.rotanApiHost}/api/shoes/shoes-class-types`);
  }

  public getProtectionTypesList(): Observable<any> {
    return this.http.get<Observable<any>>(`${environment.rotanApiHost}/api/shoes/protection-class-types`);
  }

  public getColorTypesList(): Observable<any> {
    return this.http.get<Observable<any>>(`${environment.rotanApiHost}/api/shoes/color-types`);
  }

  public getSizesTypesList(): Observable<any> {
    return this.http.get<Observable<any>>(`${environment.rotanApiHost}/api/shoes/sizes-types`);
  }

  public getModificationTypesList(): Observable<any> {
    return this.http.get<Observable<any>>(`${environment.rotanApiHost}/api/shoes/modification-types`);
  }

  public getMaterialTypesList(): Observable<any> {
    return this.http.get<Observable<any>>(`${environment.rotanApiHost}/api/shoes/material-types`);
  }

  public getSoleTypesList(): Observable<any> {
    return this.http.get<Observable<any>>(`${environment.rotanApiHost}/api/shoes/sole-types`);
  }
}
