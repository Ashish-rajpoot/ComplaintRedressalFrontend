import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, DebugNode } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { UserService } from '../services/user.service';
import { SecureserviceService } from '../services/secureservice.service';
import { catchError, throwError } from 'rxjs';
import { AUTH_URL } from '../constants/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoggedIn: boolean = false;
  roles!: any;
  email!: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private shared: SharedService,
    private userService: UserService,
    private secuerService: SecureserviceService
  ) {
    localStorage.clear();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    try {
      this.userService.getUserByEmail(this.loginForm.value.email).subscribe(
        (data) => {
          if (data) {
            this.email = data.email;
            const roles = data.roles.map((role: any) => role.rolename);
            this.roles = roles;
            try {
              this.http
                .post(AUTH_URL, this.loginForm.value, {
                  headers: { 'Content-type': 'application/json' },
                  withCredentials: true,
                })
                .pipe(
                  catchError((error: HttpErrorResponse) => {
                    console.error('Error fetching user by email:', error);
                    return throwError('Error fetching user by email');
                  })
                )
                .subscribe(
                  (data: any) => {
                    // Assuming the backend returns the JWT token in 'data.token' property
                    const token = data.token;
                    if (token) {
                      const encryptedRole = this.secuerService.encrypt(
                        roles[0]
                      );
                      const encryptedEmail = this.secuerService.encrypt(
                        this.email
                      );
                      localStorage.setItem('roles', encryptedRole);
                      localStorage.setItem('email', encryptedEmail);
                      // Store the token in localStorage (you can also use cookies)
                      localStorage.setItem('token', token);
                      // Set isLoggedIn flag to true to control UI visibility
                      this.isLoggedIn = true;
                      // Notify other components about the login status change
                      this.shared.setIsLoggedIn(true);
                      // Navigate to the home page or any desired route
                      this.router.navigate(['/home']);
                    } else {
                      // Show an appropriate error message to the user
                      alert('Login failed. Please try again later.');
                    }
                  },
                  (error: HttpErrorResponse) => {
                    // Handle different types of errors
                    if (error.status === 401) {
                      alert('Wrong password. Please try again.'); // Handle 401 error here
                    } else if (error.status === 403) {
                      alert(
                        'Cors Policy error. Please Contact your Administration.'
                      );
                    } else {
                      alert('Login failed. Please try again later.');
                    }
                  }
                );
            } catch (error) {
              alert('Login failed. Please try again later.');
            }
          } else {
            alert('Please sign up!!!');
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    } catch (error) {
      // Handle any potential errors here
    }
  }

  checkUserEmail() {
    const email = this.loginForm.value.email;
    this.userService.getUserByEmail(email).subscribe((user) => {
      if (!user) {
        const msg = confirm(
          'The user is not registered. Would you like to sign up?'
        );
        if (msg) {
          this.router.navigate(['/register']);
        }
      }
    });
  }
}
