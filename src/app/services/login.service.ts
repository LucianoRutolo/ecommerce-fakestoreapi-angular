import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { UsersService } from './users.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _usersService = inject(UsersService);
  private readonly $user = signal<User | null>(null);
  get user() {
    return computed(() => this.$user());
  }

  constructor() {
    const id = sessionStorage.getItem('user') || localStorage.getItem('user');
    console.log(id);
    console.log('hooola');
    if (id) {
      this._usersService.getUserById(id).subscribe({
        next: (data: User) => {
          this.$user.set(data);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  login(
    username: string,
    password: string,
    remember: boolean
  ): Observable<boolean> {
    return this._usersService.getAllUsers().pipe(
      map((users: User[]) => {
        const findedUser = users.find(
          (u) => u.username === username && u.password === password
        );
        if (findedUser) {
          this.$user.set(findedUser);
          console.log(this.$user);
          
          const storage = remember ? localStorage : sessionStorage;
          storage.setItem('user', String(findedUser.id));
          return true;
        }
        return false;
      }),
      catchError((err) => {
        console.error(err);
        return of(false);
      })
    );
  }

  logout(): void {
    this.$user.set(null);
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
  }
}
