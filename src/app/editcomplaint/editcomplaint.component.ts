import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RolebaseService } from '../services/rolebase.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editcomplaint',
  templateUrl: './editcomplaint.component.html',
  styleUrls: ['./editcomplaint.component.css']
})
export class EditcomplaintComponent {

  roles:any;
  roleupdate:FormGroup;

  constructor(public dialogRef: MatDialogRef<EditcomplaintComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private roleService: RolebaseService,
    private _fb : FormBuilder
    ){
      this.roleService.getRoles().subscribe((roles)=>{
        this.roles = roles;
        console.log(roles);
      })

      this.roleupdate = this._fb.group({
        roleId:''
      });

      console.log(data);
  }

  updateRole(){
    const roleId = this.roleupdate.value.roleId;
    console.log(roleId);
    this.dialogRef.close(roleId);
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
