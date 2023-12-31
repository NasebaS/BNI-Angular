import { Component, OnInit, ViewChild,Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { AppService } from "src/service/app.service";
import { Expense } from "src/model/income-expense/income-expense.model";
import { APIResponse, FileUploadType } from "src/utils/app-constants";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Ledger } from "src/model/ledger/ledger.model";


declare var $: any;

@Component({
  selector: "app-income-expense-entry",
  templateUrl: "./income-expense-entry.component.html",
  styleUrls: ["./income-expense-entry.component.scss"],
 
})
export class IncomeExpenseEntryComponent implements OnInit {
  ledgerNames: string[] = [];

  
  expenseList: Expense[] = [];
  ledgerNameToIdMap: { [name: string]: number } = {};

  submitted = false;
  newUsersForm: FormGroup;
  modalHeaderText;
  ExpenseId: number;
  selectedUsers: Expense;

  ledgerList: Ledger[] = [];
  
 

  @ViewChild("newUsers") empModal: any;

  isEditEnabled = false;
  

  constructor(
     private _appService: AppService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.getExpenseList();
    this.formValidation();
    this.getLedgerList();
 
  }
  ngAfterViewInit() {
    setTimeout(() => {
      $("#example").DataTable();
    }, 1500);
  }
  getExpenseList() {
    let reqParams={ "query": {"isdeleted":{"eq":0}},"options": {  "page": 1, "paginate": 9999 }, "isCountOnly": false }
    this._appService.getExpenseList(reqParams).subscribe(
      (response: any) => {        
        if (response.status == 0) {         
           this.expenseList = Expense.getExpenseList(response.expenseList );                 
        } 
      },
      (err) => {
        console.error('API Error:', err);
      }
    );
  }
  getLedgerList() {
    let reqParams={ "query": {"isdeleted":{"eq":0}},"options": {  "page": 1, "paginate": 9999 }, "isCountOnly": false }
    this._appService.getLedgerList(reqParams).subscribe(
      (response: any) => {
        
        if (response.status == 0) {
         
           this.ledgerList = Ledger.getLedgeList(response.ledgerList );
       
           this.ledgerNames = this.ledgerList.map(ledger => {
            this.ledgerNameToIdMap[ledger.name] = ledger.ledgerId; //mapping id with its name
            return ledger.name;
          });
         
        } 
      },
      (err) => {
        console.error('API Error:', err);
      }
    );
   
  }
  formValidation() {
    this.newUsersForm = this.formBuilder.group({
     
      entry_date: ["", [Validators.required]],
      refnum:["", [Validators.required]],
      ledgername:["", [Validators.required]],
      income:["", [Validators.required]],   
      amount: ["", [Validators.required]],
      notes: ["", [Validators.required]],
    });
  }

  extraLarge(exlargeModal: any) {
    this.submitted = false;
    this.modalService.open(exlargeModal, { size: "lg", centered: true, scrollable: true });
    this.isEditEnabled = false;
    this.ExpenseId=0;
    
    this.newUsersForm.reset();
    this.modalHeaderText = "Create New Expense";
    this.newUsersForm = this.formBuilder.group({
      
      entry_date: ["", [Validators.required]],
      refnum:["", [Validators.required]],
      ledgername:["", [Validators.required]],
      income:["", [Validators.required]],   
      amount: ["", [Validators.required]],
      notes: ["", [Validators.required]],
     
    });
  
  }

  openModal(modal) {
    this.modalHeaderText = "Create New Expense";
    this.submitted = false;
    this.newUsersForm.reset();
    this.newUsersForm.markAsUntouched();
    this.newUsersForm.markAsPristine();
    this.empModal.open(modal, { size: "lg", centered: true, scrollable: true });
  }
  get f() {
    return this.newUsersForm.controls;
  }
  closeModal() {
    this.empModal.dismiss("Cross click");
  }

  userClicked(user) {
    this.newUsersForm = this.formBuilder.group({
     
      entry_date: ["", [Validators.required]],
      refnum:["", [Validators.required]],
      ledgername:["", [Validators.required]],
      income:["", [Validators.required]],   
      amount: ["", [Validators.required]],
      notes: ["", [Validators.required]],
            
    });
    this.selectedUsers = user;
    this.isEditEnabled = true;
    if (this.selectedUsers != null) {
      this.ExpenseId = this.selectedUsers.ExpenseId;
      this.newUsersForm.patchValue({
        entry_id: this.selectedUsers.ExpenseId,
       
        ledger_id: this.selectedUsers.ledgerId,

        entry_date: this.selectedUsers.Date,
        refnum: this.selectedUsers.RefNo,
        ledgername: this.selectedUsers.ledgerName,
        income: user.Income,
        amount: this.selectedUsers.Amount,
        notes: this.selectedUsers.Notes,
         
      });
      
      this.modalService.open(this.empModal, { size: "lg", centered: true, scrollable: true });
      this.modalHeaderText = "Edit Expense";
       
    }
  } 


  postuser() {
    this.submitted = true;

    if (this.newUsersForm.invalid) {
     
            return;
    } else {
      $("#example").DataTable().destroy();
      const params = this.newUsersForm.value;
      const selectedLedgerName = params.ledgername;
    const selectedLedgerId = this.ledgerNameToIdMap[selectedLedgerName]; // Get ledger ID
  console.log("Response send to backend: ",params)
      params["entry_date"] = params["entry_date"];
      params["refnum"] = params["refnum"];
      params["ledger_id"] = selectedLedgerId;
      params["ledgername"] = params["ledgername"].toString();
      params["income"] = params["income"].toString();  
      params["amount"] = params["amount"];
      params["notes"] = params["notes"].toString();
      if(this.isEditEnabled==false){
       
        this._appService.addExpense(params).subscribe(    
          
        (response: any) => {
        
          console.log("Backend response:", response);
          
          if (response.status == APIResponse.Success) {            
          
            this.modalService.dismissAll();
            this.getExpenseList();
            setTimeout(() => {
              $("#example").DataTable();
            }, 2500);           
              Swal.fire("Congratulations.", "Expense has been created successfully..!", "success");
          } else {
            Swal.fire("Error.", "Unable to create Expense. Please try again..!", "error");
          }
        },
        (err) => {
          console.log("Error from backend:", err);
          Swal.fire("Error.", "Something went wrong. Please try again later..!", "error");
        }
      );
     
    }
else{
    
        this._appService.updateExpense(params,this.ExpenseId ).subscribe(
          
          (response: any) => {
            console.log("backend expense reponse:",response)
            console.log(params)
            if (response.status == APIResponse.Success) {  
              console.log("Response received from backend: ",response)         
              this.modalService.dismissAll();
              this.submitted = false;
              this.getExpenseList();
              setTimeout(() => {
                $("#example").DataTable();
              }, 2500);
                Swal.fire("Congratulations.", "Expense has been updated successfully..!", "success");
              
            } else {
              Swal.fire("Error.", "Unable to update Expense. Please try again..!", "error");
            }
          },
          (err) => {
            Swal.fire("Error.", "Something went wrong. Please try again later..!", "error");
          }
        );
      }
    }
  }


 
  deleteExpense(ExpenseId: number) {
    Swal.fire({
      title: 'Do you want to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this._appService.deleteExpense(ExpenseId).subscribe(
          (response: any) => {
            console.log("Response from Backend:",response)
            if (response.message === 'Expense Entry deleted successfully') {
              this.expenseList = this.expenseList.filter(expense => expense.ExpenseId !== ExpenseId);
              Swal.fire({
                title: 'Expense Record deleted successfully',
                icon: 'success'
              });
            }
          },
          (error) => {
            console.error('Delete error:', error);
          }
        );
      }
    });
  }
}
  