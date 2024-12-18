import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseUrl = 'https://localhost:7149/api/cards';

  constructor( private Http:HttpClient) { }

  //Get all cards
  GetAllCards(): Observable<Card[]>{
    return this.Http.get<Card[]>(this.baseUrl);
  }

  addCard(card: Card): Observable<Card>{
    card.id = '00000000-0000-0000-0000-000000000000';
    return this.Http.post<Card>(this.baseUrl, card);
  }

  deleteCard(id:string): Observable<Card>{
    return this.Http.delete<Card>(this.baseUrl + '/' + id)
  }

  updateCard(card: Card): Observable<Card>{
    return this.Http.put<Card>(this.baseUrl + '/' + card.id, card)
  }
}
