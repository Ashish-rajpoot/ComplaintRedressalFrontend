import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolebaseService } from '../services/rolebase.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComplaintService } from '../services/complaint.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatecomplaint',
  templateUrl: './updatecomplaint.component.html',
  styleUrls: ['./updatecomplaint.component.css'],
})
export class UpdatecomplaintComponent {
  complaintForm: FormGroup;
  roles!: any;
  complaint!:any;
  // data: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private roleService: RolebaseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdatecomplaintComponent>,
    private complaintService: ComplaintService,
    private router: Router
  ) {
    this.complaintForm = this.formBuilder.group({
      description: [this.data.selectedItem.description, Validators.required],
    });
    this.loadRoles();
    this.complaint = data.selectedItem;
  }
  loadRoles() {
    this.roleService.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }
  updateComplaint(id:any){
    const requestData = {
      id:id,
      description : this.complaintForm.value.description
    }
    this.dialogRef.close(requestData);
  }

  exitForm(){
    this.dialogRef.close();
  }
}
