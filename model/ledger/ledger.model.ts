import * as moment from "moment";
import { StringMappingType } from "typescript";

export class Ledger {
  ledgerId: number;
  name: string;
  type: string;
  status:string;

  static getLedgeList(data): Ledger[] {
    var ledgerList: Ledger[] = [];
    let ledData = data; 
   
    ledData.forEach((led) => {
      let ledger = new Ledger();   
      ledger.ledgerId = led.ledger_id;
      ledger.name = led.ledger_name;
      ledger.type = led.ledger_type;
      ledger.status = led.status;
    
      ledgerList.push(ledger);
    });
  
    return ledgerList;
  }
  

// static getLedgeData(data): Ledger[] {
//   var ledgerList: Ledger[] = [];
//   let ledData = data["data"];
//   ledData.forEach((led) => {
//     let ledger = new Ledger();      
//     ledger.name = led.ledger_name;
//     ledger.type = led.ledger_type;
//     ledger.status=led.status;
//     ledgerList.push(ledger);
//   });
//   return ledgerList;
// }
}
