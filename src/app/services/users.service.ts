import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseHttpService {
  public getAllUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${this._apiUrl}/users`);
  }
  public getUserById(id: number | string): Observable<User> {
    return this._http.get<User>(`${this._apiUrl}/users/${id}`);
  }
  public getCartFromUser(id: number | string): Observable<Cart[]> {
    return this._http.get<Cart[]>(`${this._apiUrl}/carts/user/${id}`);
  }
}
