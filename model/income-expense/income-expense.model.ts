import * as moment from "moment";
import { StringMappingType } from "typescript";

export class Expense {
    ExpenseId:number;
    ledgerId:number;
    Date:String;
    RefNo:number;
  ledgerName: string;
  Income:string;
  Amount:number;
  Notes:string;

 

  static getExpenseList(data): Expense[] {
    var expenseList: Expense[] = [];
    let expData = data; 
   
    expData.forEach((exp) => {
      let expense = new Expense();   
      expense.ExpenseId = exp.entry_id;
      expense.ledgerId = exp.ledger_id;
      expense.Date = moment(exp["entry_date"], "YYYY-MM-DD HH:mm:ss ZZ").format("DD-MM-YYYY");
      expense.RefNo = exp.refnum;
      expense.ledgerName = exp.ledgername;
      expense.Income = exp.income;
      expense.Amount = exp.amount;
      expense.Notes = exp.notes;
    
    
      expenseList.push(expense);
    });
  
    return expenseList;
  }
  



}
