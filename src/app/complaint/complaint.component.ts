import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { Complaint } from '../models/complaint';
import { ComplaintService } from '../services/complaint.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css'],
})
export class ComplaintComponent {
  private Role_URL = 'http://localhost:8081/api/role';
  complaintForm: any;
  roles: any;
  user!: Observable<any>;
  users!: any;
  
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private complaintService: ComplaintService,
    private router: Router
    ) {}
    
    ngOnInit() {
      this.complaintForm = this.formBuilder.group({
        email: ['', Validators.required],
        description: ['', Validators.required],
        assignedTo: ['', Validators.required],
      });
      
      this.loadRoles();
    }
    
    // Fetch and populate roles
    loadRoles() {
      this.http.get(this.Role_URL).subscribe((data) => {
        this.roles = data;
      });
    }
    
    // Triggered when the Enter key is pressed in the email input field
    onEmailEnter() {
      const email = this.complaintForm.get('email').value;
      if (email) {
        this.userService.getUserByEmail(email).subscribe((user) => {
          if (user) {
            this.user = of(user);
            this.users = user;
          } else {
            alert('No user Found, please Register');
          }
        });
      }
    }

    // Add a complaint
    addComplaint() {
      const date = new Date();
      
      if (this.users) {
      const submittedById = this.users.id; // Extract id of submittedBy user

      const complaint: Complaint = {
        description: this.complaintForm.value.description,
        assignedToId: this.complaintForm.value.assignedTo, // Use id for assignedTo
        submittedById: submittedById, // Use id for submittedBy
        date:date.toString(),
      };
      console.log(complaint);

     
      this.complaintService.addComplaint(complaint).subscribe(
        (data: any) => {
          console.log(data);
          this.complaintForm.reset();
        },
        (error: HttpErrorResponse) => {
          if (error.status === 201) {
            console.log('Complaint Creation Success');
            this.router.navigate(['/home']);
          }
        }
      );
    }
  }
}
