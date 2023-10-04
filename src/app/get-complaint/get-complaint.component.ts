import { Component } from '@angular/core';
import { ComplaintService } from '../services/complaint.service';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditcomplaintComponent } from '../editcomplaint/editcomplaint.component';
import { ChangeDetectorRef } from '@angular/core';
import { UpdatecomplaintComponent } from '../updatecomplaint/updatecomplaint.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { SecureserviceService } from '../services/secureservice.service';

@Component({
  selector: 'app-get-complaint',
  templateUrl: './get-complaint.component.html',
  styleUrls: ['./get-complaint.component.css'],
})
export class GetComplaintComponent {
  complaints!: any;
  longText = 'lords';
  selectedItem: any;
  selectedIndex!: number;
  updateRoleId!: number;
  isUser!: boolean;
  resolveStatus: string = 'Pending';
  isResolved: FormGroup;
  isPending!: boolean;

  private behaviourSubject = new BehaviorSubject<boolean>(false);
  isdisable$: Observable<boolean> = this.behaviourSubject.asObservable();

  constructor(
    private complaintService: ComplaintService,
    private useService: UserService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private secureService: SecureserviceService,
    private _formBuilder: FormBuilder
  ) {
    this.isResolved = this._formBuilder.group({
      isResolved: [{ value: '', disabled: false }, Validators.requiredTrue],
    });

    this.isdisable$.subscribe((value) => {
      const encryptedRole = localStorage.getItem('roles');
      if (encryptedRole) {
        const role = this.secureService.decrypt(encryptedRole);
        if (role !== 'ROLE_ADMI') {
          if (value) {
            this.isResolved.get('isResolved')?.disable();
            this.getComplaintsByRole();
          } else this.isResolved.get('isResolved')?.enable();
        }
      }
    });
  }

  ngOnInit() {
    this.getComplaintsByRole();
  }

  alertFormValues(id: any, isResolved: boolean) {
    this.complaintService.isResolved(id, isResolved).subscribe((response) => {
      this.selectedItem = response;
      this.getComplaintsByRole();
    });
  }

  getComplaintsForAdminAndTech() {
    const encryptedRole = localStorage.getItem('roles');
    if (encryptedRole) {
      const role = this.secureService.decrypt(encryptedRole);
      this.complaintService.getComplaintByRole(role).subscribe((result) => {
        this.complaints = result;
      });
    }
  }
  getComplaintsForUsers() {
    const encryptedEmail = localStorage.getItem('email');
    if(encryptedEmail){
        const email = this.secureService.decrypt(encryptedEmail);
      this.complaintService.getComplaintByEmail(email).subscribe((result) => {
        this.complaints = result;
      });
    }
  }

  getAllComplaints() {
    this.complaintService.getComplaint().subscribe((result) => {
      this.complaints = result;
    });
  }

  getComplaintsByRole() {
    const encryptedRole = localStorage.getItem('roles');
    if (encryptedRole) {
      const role = this.decryptData(encryptedRole);
      if (role === 'ROLE_ADMI') {
        this.getAllComplaints();
      } else if (role === 'ROLE_TECH') {
        this.getComplaintsForAdminAndTech();
      } else if (role === 'ROLE_USER') {
        this.getComplaintsForUsers();
        this.isUser = true;
        const email = localStorage.getItem('email');
        if (email) {
          const decryptEmail = this.secureService.decrypt(email);
          this.useService.getUserByEmail(decryptEmail).subscribe((user) => {
            if (user) {
              this.complaintService
                .getComplaintByEmail(decryptEmail)
                .subscribe((complaint) => {
                  this.complaints = complaint;
                });
            }
          });
        }
      } else {
        this.complaintService
          .getComplaintByRole(role)
          .subscribe((complaint) => {
            this.complaints = complaint;
          });
      }
    }
  }
  showContent(item: any, index: number) {
    this.behaviourSubject.next(item.isResolved);
    this.selectedItem = item;
    this.selectedIndex = index;
  }

  getFormattedDate(isoTimestamp: string): string {
    const dateObj = new Date(isoTimestamp);
    const formattedDate = dateObj.toLocaleDateString();
    const formattedTime = dateObj.toLocaleTimeString();
    return `${formattedDate} - ${formattedTime}`;
  }

  roleDialog() {
    const dialogRef = this.dialog.open(EditcomplaintComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateRoleId = result;
        this.forwardRole();
      }
    });
  }

  forwardRole() {
    this.complaintService
      .forwardComplaint(this.selectedItem.id, this.updateRoleId)
      .subscribe({
        next: (value) => {
          this.getComplaintsByRole();
          this.selectedItem = null;
          console.log(value);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  updateDialog(selectedItem: any) {
    const updateDialogRef: MatDialogRef<UpdatecomplaintComponent> =
      this.dialog.open(UpdatecomplaintComponent, {
        width: '600px',
        data: { selectedItem },
      });

    updateDialogRef.afterClosed().subscribe((data) => {
      this.updateComplaint(data.id, data.description);
    });
  }

  updateComplaint(id: any, data: any) {
    this.complaintService.updateDescription(id, data).subscribe({
      next: (value) => {
        this.getComplaintsForAdminAndTech();
        this.selectedItem = value;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  decryptData(value: string): string {
    return this.secureService.decrypt(value);
  }
}
