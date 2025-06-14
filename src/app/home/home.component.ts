import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { Observable, catchError, of } from 'rxjs';
import { BASE_URL } from '../constants/constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private router: Router,
    private http: HttpClient,
    private sharedServie: SharedService
  ) {}
  user!: any;
  loggedUser!: Observable<any>;

  ngOnInit() {
    this.getUserByToken();
  }

  getUserByToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get(`${BASE_URL}/api/auth/${token}`).subscribe(
        (data: any) => {
          this.user = data;
        },
        (err: any) => {
          if (err) {
            console.log(err.error);
          }
        }
      );
    }
  }
}
