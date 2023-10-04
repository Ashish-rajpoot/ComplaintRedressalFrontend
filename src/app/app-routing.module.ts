import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { GetComplaintComponent } from './get-complaint/get-complaint.component';
import { GetusersComponent } from './getusers/getusers.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  
  {
    path: 'adduser',
    component: AdduserComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'complaint',
    component: ComplaintComponent,
  },
  {
    path: 'getcomplaint',
    component: GetComplaintComponent,
  },
  {
    path: 'getusers',
    component: GetusersComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: '**', // This represents any URL segment that doesn't match any other route
    component: HomeComponent, // Display a "Page Not Found" component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
