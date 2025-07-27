import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserApiResponse, UserRegistration } from '../model/User.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpService) {}

  isAuthenticated: boolean = false;

  createUser(user: Partial<UserRegistration>): Observable<UserApiResponse> {
    return this.http.post<UserApiResponse>(
      'http://localhost:8080/createuser',
      user
    );
  }
}
