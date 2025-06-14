import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { SecureserviceService } from './secureservice.service';
import { BASE_URL } from '../constants/constant';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;

  private currentPage: BehaviorSubject<string>;
  public currentPage$: Observable<string>;
  decryptedData!: any;

  constructor(
    private http: HttpClient,
    private secureService: SecureserviceService
  ) {
    const decryptisLoggedIn = localStorage.getItem('isLoggedIn');

    if (decryptisLoggedIn) {
      const isLoggedIn =
        this.secureService.decrypt(decryptisLoggedIn) === 'true';
      this.decryptedData = isLoggedIn;
    }
    // const isLoggedIn = false;
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.decryptedData);
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();

    // const active page = home;
    this.currentPage = new BehaviorSubject<string>('home');
    this.currentPage$ = this.currentPage.asObservable();
  }

  getLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
    const encryptedIsLoggedIn = this.secureService.encrypt(value.toString());
    localStorage.setItem('isLoggedIn', encryptedIsLoggedIn);
  }

  getUserByToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return this.http.get(`${BASE_URL}/api/auth/${token}`);
    } else {
      return null;
    }
  }

  getCurrentPage() {
    return this.currentPage;
  }

  setCurrentPage(value: string) {
    this.currentPage.next(value);
  }
}
