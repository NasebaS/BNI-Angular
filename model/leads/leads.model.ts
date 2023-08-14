import * as moment from "moment";
import { StringMappingType } from "typescript";
import { UtilService } from "src/utils/util.service";
export class Leads {
  leadId: number;
  leadNo: string;
  leadName: string;
  leadSource: string;
  mobileNo: string;
  emailId: string;
  districtName: string;
  districtId: number;
  blockId: number;
  blockName: string;
  drp: string;
  pincode: number;
  source: string;
  createdDate:string;
  createdTime:string;
  status: string;
  applicationId: string;
  drpId: string;
  notes: string;

  static getLeadsList(data, blocklist, districtlist, userlist): Leads[] {
    var employeeList: Leads[] = [];
    let empData = data["data"];
    empData.forEach((emp) => {
      let employee = new Leads();      
      employee.leadId = emp.id;
      employee.leadNo = emp.leadNumber;
      employee.leadName = emp.name;
      employee.mobileNo = emp.phoneNumber;
      employee.pincode = emp.pincode;
      employee.emailId = emp.email;
      employee.districtName = districtlist.find(x => x.districtId === emp.districtId)?.districtName;
      employee.blockName = blocklist.find(x => x.blockId === emp.blockId)?.blockName;
      employee.drp = userlist.find(x => x.userId === emp.drpId)?.name;    
      employee.drpId = emp.drpId;    
      employee.notes = emp.notes;           
      employee.status = emp.status; 
      employee.districtId = emp.districtId; 
      employee.blockId = emp.blockId;  
      employee.createdTime = moment(emp.createdAt, "YYYY-MM-DDTHH:mm:ssZ").format("hh:mm A");
      employee.createdDate = moment(emp.createdAt, "YYYY-MM-DD HH:mm:ss ZZ").format("DD-MM-YYYY");
      employee.applicationId = emp.applicationId; 
          
      employee.source=emp.source;
     
      employeeList.push(employee);
    });
    return employeeList;
  }
}
