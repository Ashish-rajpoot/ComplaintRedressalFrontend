import { Component } from '@angular/core';
import { User } from '../models/user';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Role } from '../models/role';
import { min, toArray } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
})
export class AdduserComponent {
  private User_URL = 'http://localhost:8081/api/register';
  private Role_URL = 'http://localhost:8081/api/role';
  userForm !: FormGroup;
  roleForm!: FormGroup;
  roles!: any;
  role!:any;
  errors: string[] = [];


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private userService: UserService) {
   
  }


  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['', Validators.required],
    });

    // this.userForm = new FormGroup({
    //   username: new FormControl(),
    //   email: new FormControl(),
    //   password: new FormControl(),
    //   role: new FormControl(),
    // });

    this.roleForm = this.formBuilder.group({
      rolename: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.http.get(this.Role_URL).subscribe(data => {this.roles = data});
    console.log(this.roles)
    
  }

  registerUser(user: User) {}
  onSubmit() {
    if (this.userForm.valid) {
      const roles = this.userForm.value.roles;
  
      // Fetch role data from the server using HTTP GET request
      this.http.get<Role>(`${this.Role_URL}/${roles}`).subscribe((data) => {
        console.log('Fetched Role Data:', data);

        // After getting the role data, construct the newUser object with the correct role data
        const newUser: User = {
          username: this.userForm.value.username,
          email: this.userForm.value.email,
          password: this.userForm.value.password,
          roles: [data]
        };
  
        // Set the headers for the request (e.g., content type)
        // const headers = new HttpHeaders({
        //   'Content-Type': 'application/json'
        // });

        console.log('newUser:', newUser);
  
        // Make the HTTP POST request
        this.userService.addUser(newUser).subscribe(
          (data) => {
            console.log('User registered successfully:', data);
          }
          ,
          (error: HttpErrorResponse) => {
            if (error.status === 400) {
              console.log(error.error);
            } else {
              // Handle other error cases, show a generic error message, etc.
              console.log(error.error);
            }
          }
        );
      });
    }
  }


  addRole() {
    if (this.roleForm.valid) {
      // Perform the form submission or API call here
      let updaterolename ="ROLE_" + (this.roleForm.value.rolename.toUpperCase()).substring(0,4);
      
      const roleDetail :  Role ={
        rolename: updaterolename,
      };
    
      this.http.post(this.Role_URL, roleDetail).subscribe(
        (data) => {
          console.log('User registered successfully!', data);
          // Handle successful registration, e.g., show a success message, redirect, etc.
        }
        ,
        (error: HttpErrorResponse) => {
          if (error.status === 400) {
            console.log('User registration. Error: ');
          } else {
            // Handle other error cases, show a generic error message, etc.
          }
        }
      );
      
    }
  }
}
