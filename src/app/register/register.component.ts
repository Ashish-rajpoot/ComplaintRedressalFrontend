import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Role } from '../models/role';
import { Router } from '@angular/router';
import { getMatFormFieldMissingControlError } from '@angular/material/form-field';
import { Role_URL } from '../constants/constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userForm!: FormGroup;
  roleForm!: FormGroup;
  roles!: any;
  role!: any;
  errors: string[] = [];
  roleapi!: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['', Validators.required],
    });

    this.roleForm = this.formBuilder.group({
      rolename: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.http.get(Role_URL).subscribe((data) => {
      this.roles = data;
    });
  }

  handleKeyUp(event: any) {
    const inputValue = event.target.value;
    const emailModified = inputValue + '@gmail.com';
    this.userForm.get('email')?.setValue(emailModified);
    this.checkUser();
  }

  onSubmit() {
    if (this.userForm.valid) {
      const roles = this.userForm.value.roles;

      // Fetch role data from the server using HTTP GET request
      this.http.get<Role>(`${Role_URL}/${roles}`).subscribe(
        (data) => {
          console.log('Fetched Role Data:', data);

          // After getting the role data, construct the newUser object with the correct role data
          const newUser: User = {
            username: this.userForm.value.username,
            email: this.userForm.value.email,
            password: this.userForm.value.password,
            roles: [data], // Make sure that 'data' contains the correct role information
          };

          console.log(newUser);

          // Send the newUser data to the backend for registration
          this.userService.addUser(newUser).subscribe(
            () => {
              console.log('User registered successfully');
              alert('User registered successfully');
              this.router.navigate(['/login']); // Redirect to login page
            },
            (error: HttpErrorResponse) => {
              if (error.status === 400) {
                alert('User Already Registered');
              } else {
                alert('Error registering user');
              }
              console.log(error.error);
            }
          );
        },
        (error: HttpErrorResponse) => {
          alert('Error fetching role data');
          console.log(error.error);
        }
      );
    }
  }

  addRole() {
    if (this.roleForm.valid) {
      // Perform the form submission or API call here
      let updaterolename =
        'ROLE_' + this.roleForm.value.rolename.toUpperCase().substring(0, 4);

      const roleDetail: Role = {
        rolename: updaterolename,
      };

      this.http.post(Role_URL, roleDetail).subscribe(
        (data) => {
          console.log('User registered successfully!', data);
          // Handle successful registration, e.g., show a success message, redirect, etc.
        },
        (error: HttpErrorResponse) => {
          if (error.status === 201) {
            alert(' registered successfully');
            this.router.navigate(['/register']);
          }
          if (error.status === 400) {
            console.log('User registration. Error: ');
          } else {
            // Handle other error cases, show a generic error message, etc.
          }
        }
      );
    }
  }

  checkUser() {
    const email = this.userForm.value.email;
    // const email = this.userForm.get('email');
    console.log(email);
    if (email !== null) {
      this.userService.getUserByEmail(email).subscribe((user) => {
        if (user) {
          alert('user already registered');
          // this.userForm.invalid;
        }
      });
    }
  }
}
