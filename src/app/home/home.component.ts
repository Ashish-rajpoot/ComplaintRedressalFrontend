import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private url = 'http://localhost:8081/home/';
  constructor(private router: Router, private http: HttpClient, private sharedServie:SharedService) {
  }
  user!: any;
  loggedUser!: Observable<any>;


  ngOnInit() {
    this.getUserByToken();
  }

  getUserByToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http
        .get(`http://localhost:8081/api/auth/${token}`)
        .subscribe((data: any) => {
          this.user = data;
        },(err:any)=>{
          if (err) {
            console.log(err.error);
          }
        });
    }
  }

 
  
}
