import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, FormGroup,FormControl ,Validators } from "@angular/forms";
import { Subject, Observable } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import { Block } from "src/model/common/block.model";
import { District } from "src/model/common/district.model";
import { Table } from './documents.model';
import Swal from "sweetalert2";
import { AppService } from "src/service/app.service";
import { UtilService } from "src/service/util.service";
import { Users } from "src/model/users/users.model";
import { APIResponse, FileUploadType } from "src/utils/app-constants";

import { DocumentsService } from './documents.service';
import { DocumentsSortableDirective, SortEvent } from './documents-sortable.directive';
import { AppDataService } from 'src/service/app-data.service';
import { Leads } from 'src/model/leads/leads.model';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  providers: [DocumentsService, DecimalPipe]
})

/**
 * Advanced table component
 */
export class DocumentsComponent implements OnInit {
  // bread crum data
  breadCrumbItems: Array<{}>;
  newEmployeeForm: FormGroup;
  submitted = false;
  // Table data
  tableData: Table[];  
  userList: Users[] = [];
  public selected: any;
  selectDistrict:  District[];
  selectStatus:string[];
  selectedDistrict: District;
  selectBlock:  Block[];
  AllBlocks:  Block[];
  hideme: boolean[] = [];
  editableTable: any;  
  selectedLeads: Leads;
  private _unsubscribeAll: Subject<any>;
  isEditClicked:boolean=false;

  @ViewChildren(DocumentsSortableDirective) headers: QueryList<DocumentsSortableDirective>;
  public isCollapsed = true;

  constructor(public service: DocumentsService,
    private _appDataService: AppDataService,
    private _appService: AppService,
    public formBuilder: FormBuilder) {
    this.selectedLeads = JSON.parse(localStorage.getItem("selectedLead"));        
  }

  ngOnInit() {   
    this.selectStatus=['Additional Documents Required for Bank','Application Withdrawal','Deficiency and Pending  with User','Draft','Loan Rejected', 'Loan Sanctioned', 'Pending with DLC', 'Pending with DRP', 'Pending with Lending Bank','Rejected By DLC'];
    this.formValidation();
    this.getDistrictlist();
    this.getAllBlockList();
    this.newEmployeeForm.patchValue({
      notes: this.selectedLeads.notes 
    });
  }
  formValidation() {
    this.newEmployeeForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      districtId: ["", [Validators.required]],
      blockId: ["", [Validators.required]],     
      email: ["", [Validators.email]],
      phoneNumber: ["", [Validators.required]],     
      pincode: [""],   
      notes: [""],     
      drpId: [""],     
      status: [""],   
    });
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

  getAllBlockList() {
    let reqParams={ "options": { "select": [ "id", "name", "districtId" ], "page": 1, "paginate": 9999 }, "isCountOnly": false }
    this._appService.getBlockList(reqParams).subscribe(
      (response: any) => {
        if (response.status == APIResponse.Success) {
          this.AllBlocks = Block.getBlockList(response.data);
        } 
      },
      (err) => {
      //  console.log("Unable to get service");
      }
    );
  }

  districtChanged(district) {
    this.selectedDistrict = district;    
    this.getBlockList(this.selectedDistrict.districtId);
  }

  getBlockList(districtID) {
    this.newEmployeeForm.patchValue({ 
      blockId: null
    });
    
    let reqParams={ "query": {"districtId":{"eq":districtID}},"options": { "select": [ "id", "name" ], "page": 1, "paginate": 9999 }, "isCountOnly": false }
    
    this._appService.getBlockList(reqParams).subscribe(
      (response: any) => {
        if (response.status == APIResponse.Success) {
         
          this.selectBlock = Block.getBlockList(response.data);
        } else {
       //   console.log("Unable to get service");
        }
      },
      (err) => {
      //  console.log("Unable to get service");
      }
    );
  }

  changeValue(i) {
    this.hideme[i] = !this.hideme[i];
  }

  editlead(){
    this.isEditClicked=true;
    this.newEmployeeForm.patchValue({
      name: this.selectedLeads.leadName,
      email: this.selectedLeads.emailId,
      districtId: this.selectedLeads.districtId,
      status: this.selectedLeads.status,
      phoneNumber: this.selectedLeads.mobileNo,
      pincode: this.selectedLeads.pincode, 
      blockId: this.selectedLeads.blockId,     
      drpId: this.selectedLeads.drpId, 
      notes: this.selectedLeads.notes       
    });
    this.getBlockList(this.selectedLeads.districtId);
      setTimeout(() => {
        this.newEmployeeForm.patchValue({
          blockId: this.selectedLeads.blockId     
        });
      }, 1000);
  }
  
  get f() {
    return this.newEmployeeForm.controls;
  }

  savelead() {      
    this.submitted = true;
    if (this.newEmployeeForm.invalid) {
      return;
    } else {
      var params = this.newEmployeeForm.value;
      params["districtId"] = params["districtId"].toString();
      params["blockId"] = params["blockId"].toString();
      // params["id"] = this.selectedLeads.leadId;
      
      this._appService.updateLead(params, this.selectedLeads.leadId).subscribe(
        (response: any) => {
          if (response.status == APIResponse.Success) {  
           this.getLeadList();
            this.isEditClicked=false;          
              Swal.fire("Congratulations.", "Lead has been updated successfully..!", "success");
             
            
          } else {
            Swal.fire("Error.", "Unable to create Lead. Please try again..!", "error");
          }
        },
        (err) => {
          Swal.fire("Error.", "Something went wrong. Please try again later..!", "error");
        }
      );
    }
  }

  getUserList() {
    let reqParams={ "query": {"isdeleted":{"eq":0}},"options": {  "page": 1, "paginate": 9999 }, "isCountOnly": false }
    this._appService.getUserList(reqParams).subscribe(
      (response: any) => {
        if (response.status == APIResponse.Success) {
           this.userList = Users.getUsersData(response.data);
        } 
      },
      (err) => {
       // console.log("server error");
      }
    );
  }

  getLeadList() {
    let reqParams={ "query": {"id":{"eq":this.selectedLeads.leadId}},"options": {  "page": 1, "paginate": 9999 }, "isCountOnly": false }
    this._appService.getLeadList(reqParams).subscribe(
      (response: any) => {
        if (response.status == APIResponse.Success) {
           this.selectedLeads = Leads.getLeadsList(response.data, this.AllBlocks, this.selectDistrict, this.userList)[0];
           localStorage.setItem("selectedLead", JSON.stringify(this.selectedLeads));
        } 
      },
      (err) => {
       // console.log("server error");
      }
    );
  }

}
