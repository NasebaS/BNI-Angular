import { Component, OnInit, ViewChildren, QueryList, NgModule } from "@angular/core";
import { FormBuilder, FormGroup,FormControl ,Validators } from "@angular/forms";
import { DecimalPipe } from "@angular/common";
import { Observable } from "rxjs";
import { Users } from "src/model/users/users.model";
import { Table } from "./list.model";
import { OwlOptions } from "ngx-owl-carousel-o";
import { ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ListService } from "./list.service";
import { ListSortableDirective, SortEvent } from "./list-sortable.directive";
import { AppService } from "src/service/app.service";
import { UtilService } from "src/service/util.service";
import { Router } from "@angular/router";
import { APIResponse, FileUploadType } from "src/utils/app-constants";
import Swal from "sweetalert2";
import * as moment from "moment";
import * as XLSX from "xlsx";
import { Lab } from "src/model/common/lab.model";
import { Block } from "src/model/common/block.model";
import { District } from "src/model/common/district.model";
import { Sector } from "src/model/common/sector.model";
import { Role } from "src/model/role/role.model";
declare var $: any;
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  providers: [ListService, DecimalPipe],
})

/**
 * Advanced table component
 */
export class ListComponent implements OnInit {
  // bread crum data
  userList: Users[] = [];
  breadCrumbItems: Array<{}>;

  submitted = false;
  newUsersForm: FormGroup;
  selectedUsers: Users;
  selectedFile: File;
  selectedExcelFile: File;
  // Table data
  tableDatas;
  public selected: any;
  selectDistrict:  District[];
  selectRole:  Role[];
  selectedDistrict: District;
  selectBlock:  Block[];
  AllBlocks: Block[];
  hideme: boolean[] = [];
  currentLabList: Lab[] = [];
  selectServices:  Sector[];

  editableTable: any;
  isEditEnabled = false;
  selectStatus: string[];
  selectBg: string[];
  selectCity:string[];
  isCouponVerified = false;  
  formGender: number = 1;  
  showAppointment: number = 0;
  userId: number = 0;
  imgPreview;
  modalHeaderText;
  filename = "";
  filecount = "";
  event_type: any;

  timelineCarousel: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: true,
    navText: ["<i class='mdi mdi-chevron-left'></i>", "<i class='mdi mdi-chevron-right'></i>"],
    dots: false,
    responsive: {
      680: {
        items: 6,
      },
    },
  };

  @ViewChildren(ListSortableDirective) headers: QueryList<ListSortableDirective>;
  @ViewChild("newUsers") empModal: any;
  @ViewChild("uploadUsers") uploadModal: any;
  public isCollapsed = true;

  constructor(
    private _appService: AppService,
    private _appUtil: UtilService,
    public service: ListService,
    private router: Router,
    private modalService: NgbModal,
    public formBuilder: FormBuilder
  ) { 
    this.getDistrictlist();
    this.getRolelist();
    this.getAllBlockList();
  }

  ngOnInit() {   
    setTimeout(() => {
      this.getUserList();
    }, 1000);
    this.formValidation();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      $("#example").DataTable();
    }, 1500);
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

  
  districtChanged(district) {
    this.selectedDistrict = district;  
    this.newUsersForm.patchValue({ 
      blockId: null
    });
    
     this.getBlockList(this.selectedDistrict.districtId);
    // this.selectBlock=this.AllBlocks.filter(function (el) { el.districtId == district.districtId });
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

  getBlockList(districtID) {
    this.newUsersForm.patchValue({ 
      blockId: null
    });
    
    let reqParams={ "query": {"districtId":{"eq":districtID}},"options": { "select": [ "id", "name", "districtId" ], "page": 1, "paginate": 9999 }, "isCountOnly": false }
    
    this._appService.getBlockList(reqParams).subscribe(
      (response: any) => {
        if (response.status == APIResponse.Success) {         
          this.selectBlock = Block.getBlockList(response.data);
        }
      },
      (err) => {
      }
    );
  }
  
  get f() {
    return this.newUsersForm.controls;
  }
  getUserList() {
    let reqParams={ "query": {"isdeleted":{"eq":0}},"options": {  "page": 1, "paginate": 9999 }, "isCountOnly": false }
    this._appService.getUserList(reqParams).subscribe(
      (response: any) => {
        if (response.status == APIResponse.Success) {
           this.userList = Users.getUsersList(response.data, this.selectDistrict,this.AllBlocks,this.selectRole );
        } 
      },
      (err) => {
       // console.log("server error");
      }
    );
  }

  extraLarge(exlargeModal: any) {
    this.submitted = false;
    this.modalService.open(exlargeModal, { size: "lg", centered: true, scrollable: true });
    this.isEditEnabled = false;
    this.userId=0;
    this.newUsersForm.reset();
    this.modalHeaderText = "Create New User";
    this.newUsersForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      districtId: ["", [Validators.required]],
      blockId: ["", [Validators.required]],     
      email: ["", [Validators.email]],
      phoneNumber: ["", [Validators.required]],   
      roleId: ["", [Validators.required]],   
      username: ["", [Validators.required]],   
      password: ["", [Validators.required]],    
      cpassword: ["", [Validators.required]],   
      userCode: [""], 
      role: [""],        
    },{validator: this.ConfirmedValidator('password', 'cpassword'),});
  
  }

  importLarge(exlargeModal: any) {
    this.selectedExcelFile = null;
    this.modalService.open(this.uploadModal, { size: "lg", centered: true, scrollable: true });
  }

  largeModal(largeDataModal: any) {
    this.showAppointment=0;
    this.modalService.open(largeDataModal, { size: "xl", centered: true, scrollable: true });    
  }

  formValidation() {
    this.newUsersForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      districtId: ["", [Validators.required]],
      blockId: ["", [Validators.required]],     
      email: ["", [Validators.email]],
      phoneNumber: ["", [Validators.required]],   
      roleId: ["", [Validators.required]],   
      username: ["", [Validators.required]],   
      password: ["", [Validators.required]],    
      cpassword: ["", [Validators.required]],   
      userCode: [""], 
      role: [""],        
    },{validator: this.ConfirmedValidator('password', 'cpassword'),});
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

  userClicked(user) {
    this.newUsersForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      districtId: ["", [Validators.required]],
      blockId: ["", [Validators.required]],     
      email: ["", [Validators.email]],
      phoneNumber: ["", [Validators.required]],   
      roleId: ["", [Validators.required]],   
      username: ["", [Validators.required]],   
      userCode: [""], 
      role: [""],        
    });
    this.selectedUsers = user;
    this.isEditEnabled = true;
    if (this.selectedUsers != null) {
      this.newUsersForm.patchValue({
        name: this.selectedUsers.name,
        username: this.selectedUsers.userName,
        password: this.selectedUsers.password,
        email: this.selectedUsers.emailId,
        userCode: this.selectedUsers.userCode,
        userId: this.selectedUsers.userId, 
        blockId: this.selectedUsers.blockId,     
        districtId: this.selectedUsers.districtId, 
        roleId: this.selectedUsers.roleId       
      });
      this.getBlockList(this.selectedUsers.districtId);
      setTimeout(() => {
        this.newUsersForm.patchValue({
          blockId: this.selectedUsers.blockId     
        });
      }, 1000);
      this.userId=this.selectedUsers.userId;
      this.modalService.open(this.empModal, { size: "lg", centered: true, scrollable: true });
      this.modalHeaderText = "Edit User";
      
    }
  } 

  postuser() {      
    this.submitted = true;
    if (this.newUsersForm.invalid) {
      console.log("validator");
      return;
    } else {
      $("#example").DataTable().destroy();
      var params = this.newUsersForm.value;
      params["districtId"] = params["districtId"].toString();
      params["blockId"] = params["blockId"].toString();
      params["roleId"] = params["roleId"].toString();
      params["role"] = params["roleId"].toString();
      if(this.isEditEnabled==false){
      this._appService.addUser(params).subscribe(
        (response: any) => {
          if (response.status == APIResponse.Success) {            
            this.modalService.dismissAll();
            this.getUserList();
            setTimeout(() => {
              $("#example").DataTable();
            }, 2500);           
              Swal.fire("Congratulations.", "User has been created successfully..!", "success");
          } else {
            Swal.fire("Error.", "Unable to create User. Please try again..!", "error");
          }
        },
        (err) => {
          Swal.fire("Error.", "Something went wrong. Please try again later..!", "error");
        }
      );
    }
else{
        // params["userId"] = this.userId;
        this._appService.updateUser(params,this.userId ).subscribe(
          (response: any) => {
            if (response.status == APIResponse.Success) {            
              this.modalService.dismissAll();
              this.submitted = false;
              this.getUserList();
              setTimeout(() => {
                $("#example").DataTable();
              }, 2500);
                Swal.fire("Congratulations.", "User has been updated successfully..!", "success");
              
            } else {
              Swal.fire("Error.", "Unable to update User. Please try again..!", "error");
            }
          },
          (err) => {
            Swal.fire("Error.", "Something went wrong. Please try again later..!", "error");
          }
        );
      }
    }
  }

  deleteUser(id){
    if(confirm("Are you sure to delete this record?")) {
    
    this._appService.deleteUser(id).subscribe(
      (response: any) => {
        if (response.status == APIResponse.Success) {
          this.getUserList();
          Swal.fire("Congratulations.", "User has been delete successfully..!", "success");
        } 
      },
      (err) => {
       // console.log("server error");
      }
    );
  }
}

}
