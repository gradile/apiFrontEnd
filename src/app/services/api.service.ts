import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Matter } from '../models/matter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  private REST_API_SERVER = "http://gradilec.ipower.com/api2020/";

  readMatters(): Observable<Matter[]> {
    return this.httpClient.get<Matter[]>(`${this.REST_API_SERVER}read.php`);
  }

  createMatter(matter: Matter): Observable<Matter> {
    return this.httpClient.post<Matter>(`${this.REST_API_SERVER}create.php`, matter);
  }

  updateMatter(matter: Matter) {
    return this.httpClient.put<Matter>(`${this.REST_API_SERVER}update.php`, matter);
  }

  deleteMatter(id: number) {
    return this.httpClient.delete<Matter>(`${this.REST_API_SERVER}delete.php/?case_number_id=${id}`);
  }
}
