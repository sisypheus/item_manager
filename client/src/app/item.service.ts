import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private API = environment.API;

  constructor(private http: HttpClient) { }

  //get items
  public getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.API}/items`);
  }

  public getItemsByCategory(category: String): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.API}/items/category/${category}`);
  }

  public createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.API}/item/create`, item);
  }

  public modifyCount(item: Item, count: Number): Observable<Item> {
    return this.http.post<Item>(`${this.API}/item/modify/count`, {'count': count, 'id': item.id});
  }

  public modifyItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.API}/item/modify/${item.id}`, item);
  }

  public deleteItem(id: String): Observable<void> {
    return this.http.delete<void>(`${this.API}/item/delete/${id}`);
  }
}
