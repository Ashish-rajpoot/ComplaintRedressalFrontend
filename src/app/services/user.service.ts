import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_URL = 'http://localhost:8081/api/register';
  private ROOT_URL = 'http://localhost:8081';
  constructor(private http: HttpClient, 
    ) {}

  

  addUser(user: User): Observable<any> {
    return this.http.post(this.BASE_URL, user, {
      headers: { 'Content-Type': 'application/json' }, responseType:'text'
    });
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.ROOT_URL}/user/email/${email}`,{responseType: 'json'});
    // return this.http.get<any>(`${this.ROOT_URL}/user/email/${email}`,{responseType: 'json'});
  }
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.ROOT_URL}/user`)
  }

  getUser():Observable<any>{
    return this.http.get<any>(`${this.ROOT_URL}/api/auth/principle`)
  }

  updateProfile(user:any,newpass:string):Observable<any>{
    return this.http.post(`${this.BASE_URL}/profilePostData/${newpass}`,user,{
      headers:{'Content-Type':'application/json'}, responseType:'text'
    })
  }
}
