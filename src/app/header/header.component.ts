import { Component, EventEmitter, OnChanges, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SharedService } from '../services/shared.service';
import { Subscription } from 'rxjs';
import { forLoggedIn, headerLinks } from '../shared/links';
import { SecureserviceService } from '../services/secureservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  links!: any[];
  loggedInLinks!: any[];
  rolesLinks!: any[];
  isLoggedIn!: boolean;
  role!: string;
  private subscriptions!: Subscription;

  constructor(private router: Router, private sharedService: SharedService, private secuerService:SecureserviceService) {
    this.subscriptions = this.sharedService.isLoggedIn$.subscribe((value) => {
      console.log(value);
      this.isLoggedIn = value;
    });
  }

  logout() {
    localStorage.clear();
    this.sharedService.setIsLoggedIn(false);
    this.isLoggedIn = this.sharedService.getLoggedIn();
    console.log(this.isLoggedIn);
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngOnInit() {
    this.links = headerLinks;
    this.loggedInLinks = forLoggedIn;
    }

  hasRole(roles: string[]): boolean {
    const encryptedRole = localStorage.getItem('roles');
    
    if (encryptedRole) {
      const storedRoles = this.secuerService.decrypt(encryptedRole);
      const storedRolesArray = storedRoles.split(',');
      return roles.some(role => storedRolesArray.includes(role));
    }
    
    return false;
  }
  

  
  
}
