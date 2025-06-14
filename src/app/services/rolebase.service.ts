import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants/constant';
const Role_URL = `${BASE_URL}/api/role`;

@Injectable({
  providedIn: 'root',
})
export class RolebaseService {
  getLoggedInUser!: any;

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {}

  getLoggedInUserData() {
    const loggedEmail = localStorage.getItem('email');
    if (loggedEmail) {
      this.userService.getUserByEmail(loggedEmail).subscribe((user) => {
        this.getLoggedInUser = user;
      });
    }
  }

  getRoles(): Observable<any> {
    return this.http.get<any>(Role_URL);
  }
}
