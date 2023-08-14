import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl ,Validators } from "@angular/forms";
import { revenueBarChart, statData } from './data';
import { ChartType } from './profile.model';
import { ViewChild } from "@angular/core";
import { Users } from "src/model/users/users.model";
import Swal from "sweetalert2";
import { AppService } from "src/service/app.service";
import { UtilService } from "src/service/util.service";
import { Router } from "@angular/router";
import { APIResponse, FileUploadType } from "src/utils/app-constants";
import { District } from 'src/model/common/district.model';
import { Role } from 'src/model/role/role.model';
import { Block } from 'src/model/common/block.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

/**
 * Contacts-profile component
 */
export class ProfileComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  submitted = false;
  newUsersForm: FormGroup;
  newPasswordForm: FormGroup;
  revenueBarChart: ChartType;
  selectDistrict:  District[];
  selectRole:  Role[];
  selectedUsers: Users = new Users();
  userList: Users[];
  selectedDistrict: District;
  AllBlocks: Block[];
  isEditClicked:boolean=false;
  statData;

  @ViewChild("newEmployee") empModal: any;
  constructor(private _appService: AppService,
    private _appUtil: UtilService,
    private router: Router,
    public formBuilder: FormBuilder) { 
      this.getDistrictlist();
      this.getRolelist();
      this.getAllBlockList();
    }

    ngOnInit() {   
      setTimeout(() => {
        this.getUserList();
      }, 1000);
      this.formValidation();
      this.breadCrumbItems = [{ label: 'Users' }, { label: 'Profile', active: true }];
    }

    getDistrictlist() {
      let reqParams={ "query": {},"options": { "select": [ "id", "name" ], "page": 1, "paginate": 9999 }, "isCountOnly": false }
      this._appService.getDistrictList(reqParams).subscribe(
        (response: any) => {
          if (response.status == APIResponse.Success) {   
            this.selectDistrict = District.getDistrictList(response.data);
          }
        }, (err) => {  }
      );
    }
  
    getRolelist() {
      let reqParams={ "query": {},"options": { "select": [ "id", "name" ], "page": 1, "paginate": 9999 }, "isCountOnly": false }
      this._appService.getRoleList(reqParams).subscribe(
        (response: any) => {
          if (response.status == APIResponse.Success) {   
            this.selectRole = Role.getRoleList(response.data);
          }
        }, (err) => {  }
      );
    } 
    
    getAllBlockList() {
        
      let reqParams={ "options": { "select": [ "id", "name", "districtId" ], "page": 1, "paginate": 9999 }, "isCountOnly": false }
      
      this._appService.getBlockList(reqParams).subscribe(
        (response: any) => {
          if (response.status == APIResponse.Success) {
            this.AllBlocks = Block.getBlockList(response.data);
          } else {
         //   console.log("Unable to get service");
          }
        },
        (err) => {
        //  console.log("Unable to get service");
        }
      );
    }

    getUserList() {
      this.selectedUsers = JSON.parse(localStorage.getItem("SessionDetails"));
      this.selectedUsers.districtName=this.selectDistrict.find(x => x.districtId === this.selectedUsers.districtId)?.districtName;
      this.selectedUsers.blockName=this.AllBlocks.find(x => x.blockId === this.selectedUsers.blockId)?.blockName;
      this.selectedUsers.role=this.selectRole.find(x => x.roleId === this.selectedUsers.roleId)?.roleName;
    }
   
  get f() {
    return this.newUsersForm.controls;
  }
  get fg() {
    return this.newPasswordForm.controls;
  }
  editPassword(){
    this.isEditClicked=true;
  }
  savePassword(){
    this.submitted = true;
    if (this.newPasswordForm.invalid) {
      return;
    } else {
      var params = this.newPasswordForm.value;      
      params["id"] = this.selectedUsers.id;
      this._appService.change_password(params).subscribe(
        (response: any) => {
          if (response.status == APIResponse.Success) {            
              Swal.fire("Congratulations.", "Password has been updated successfully..!", "success");
              this.newPasswordForm.patchValue({
                cpassword: '',
                newPassword: '',
                oldPassword: ''      
              });
              this.submitted = false;
              this.isEditClicked=false;
          } else {
            Swal.fire("Error.", response.message, "error");
          }
        },
        (err) => {
          Swal.fire("Error.", "Something went wrong. Please try again later..!", "error");
        }
      );
    }
  }

  formValidation() {
    this.newPasswordForm = this.formBuilder.group({
      oldPassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required]],
      cpassword: ["", [Validators.required]]
    },{validator: this.ConfirmedValidator('newPassword', 'cpassword'),});
  }

  closePassword(){
    this.isEditClicked=false;
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
 

}
