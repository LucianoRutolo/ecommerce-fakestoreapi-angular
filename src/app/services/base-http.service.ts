import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  protected _http = inject(HttpClient);
  protected _apiUrl = environment.API_URL;
}
