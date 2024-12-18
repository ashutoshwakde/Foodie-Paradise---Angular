import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MealService {

  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  searchMeals(keyword: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search.php?s=${keyword}`);
  }
  
}
