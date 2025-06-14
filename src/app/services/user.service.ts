import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { BASE_URL } from '../constants/constant';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private REGISTER_URL = `${BASE_URL}/api/register`;
  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<any> {
    return this.http.post(this.REGISTER_URL, user, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text',
    });
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/user/email/${email}`, {
      responseType: 'json',
    });
    // return this.http.get<any>(`${BASE_URL}/user/email/${email}`,{responseType: 'json'});
  }
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/user`);
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/api/auth/principle`);
  }

  updateProfile(user: any, newpass: string): Observable<any> {
    return this.http.post(
      `${this.REGISTER_URL}/profilePostData/${newpass}`,
      user,
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text',
      }
    );
  }
}
