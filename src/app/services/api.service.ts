import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Matter } from "../models/matter";
import { Observable } from "rxjs";
import { Category } from "../models/category";
import { Subcategory } from "../models/subcategory";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  private REST_API_SERVER = "http://dilelle.us/api2020/";

  readMatters(): Observable<Matter[]> {
    return this.httpClient.get<Matter[]>(`${this.REST_API_SERVER}read.php`);
  }

  read(id): Observable<Matter> {
    return this.httpClient.get<Matter>(
      `${this.REST_API_SERVER}read_one.php?case_number_id=${id}`
    );
  }

  createMatter(matter: Matter): Observable<Matter> {
    return this.httpClient.post<Matter>(
      `${this.REST_API_SERVER}create.php`,
      matter
    );
  }

  updateMatter(id, matter: Matter): Observable<Matter> {
    return this.httpClient.post<Matter>(
      `${this.REST_API_SERVER}update.php?case_number_id=${id}`,
      matter
    );
  }

  deleteMatter(id): Observable<Matter> {
    return this.httpClient.delete<Matter>(
      `${this.REST_API_SERVER}delete.php?case_number_id=${id}`
    );
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(
      `${this.REST_API_SERVER}categories.php`
    );
  }

  getLastCaseNumber(): Observable<any> {
    return this.httpClient.get(
      `${this.REST_API_SERVER}read_last_file_number.php`
    );
  }

  getRelatedSubcategory(id): Observable<any> {
    return this.httpClient.get(
      `${this.REST_API_SERVER}relatedSubcategories.php?id=${id}`
    );
  }

  searchByName(name): Observable<any> {
    return this.httpClient.get(`${this.REST_API_SERVER}name.php?name=${name}`);
  }
}
