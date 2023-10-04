import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { SecureserviceService } from '../services/secureservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  profile: FormGroup;
  userData!: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router:Router
  ) {
    this.profile = this.fb.group({
      username: ['', Validators.required],
      email: [{ value: '' }, Validators.required],
      password: ['', Validators.required],
      newpassword: ['', Validators.required],
      conpassword: ['', Validators.required],
    });

    this.userService.getUser().subscribe({
      next: (data) => {
          this.profile = this.fb.group({
            username: [data.username, Validators.required],
            email: [data.email, Validators.required],
            password: ['', Validators.required],
            newpassword: ['', Validators.required],
            conpassword: ['', Validators.required],
          });
          // console.log(data);
          this.userData = data;
        
      },
      error: (error) => {
        console.log(error);
      },
    });

    // this.userService.getUserByEmail(){

    // }
  }

  editProfile() {
    const user = this.profile.value;
    if (user.newpassword === user.conpassword) {
      this.userService.updateProfile(user, user.newpassword).subscribe({
        next: (data) => {
          alert(data);
          this.router.navigate(['/home'])
        },
        error: (err) => {
          alert(err.error)
          console.log(err);
        },
      });
    } else {
      alert('new password And Confirm Password should be same!!!');
    }
  }

  checkConfirmPassword() {}
}
