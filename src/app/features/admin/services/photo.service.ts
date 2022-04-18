import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  // public uploadPhoto(formData: FormData): Observable<any> {
  //   return this.http.post<any>(`${environment.rotanApiHost}/api/s3/upload-image`, formData, {
  //     // headers: {
  //     //   'Content-Type': 'multipart/form-data',
  //     // }
  //   });
  // }


  // public getPhoto(imageKey: string): Observable<any> {
  //   return this.http.
  // }

  public getUrl(): Observable<any> {
    return this.http.get<any>(`${environment.rotanApiHost}/api/s3/create-signed-url`, {
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // }
    });
  }


  public uploadFileToS3(url: string, file: Blob): Observable<any> {

    return this.http.put<any>(url, file, {
          // headers: {
          //   'Content-Type': 'image/jpeg',
          // }
        });
  }
}
