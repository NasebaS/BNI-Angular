import * as moment from "moment";
import { StringMappingType } from "typescript";
export class Users {
  userId: number;
  userName: string;
  password: string;
  emailId: string;
  name: string;
  mobileNo: string;
  districtName: string;
  userCode: string;
  accountNo: string;
  districtId: number;
  blockId: number;
  blockName: string;
  role: string;
  roleId: number;
  id: number;

  static getUsersList(data, districtlist, blocklist, rolelist): Users[] {
    var employeeList: Users[] = [];
    let empData = data["data"];
    empData.forEach((emp) => {
      let employee = new Users();      
      employee.userId = emp.id;
      employee.userName = emp.username;
      employee.name = emp.name;
      employee.emailId = emp.email;
      employee.mobileNo = emp.mobileNo;
      employee.districtName = districtlist.find(x => x.districtId === emp.districtId)?.districtName;
      employee.blockName = blocklist.find(x => x.blockId === emp.blockId)?.blockName;
      employee.districtId = emp.districtId; 
      employee.role = rolelist.find(x => x.roleId === emp.roleId)?.roleName; 
      employee.roleId = emp.roleId; 
      employee.blockId = emp.blockId;       
      employee.userCode = emp.userCode;       
      employee.accountNo = emp.accountNo;       
      employeeList.push(employee);
    });
    return employeeList;
  }


static getUsersData(data): Users[] {
  var employeeList: Users[] = [];
  let empData = data["data"];
  empData.forEach((emp) => {
    let employee = new Users();      
    employee.userId = emp.id;
    employee.userName = emp.username;
    employee.name = emp.name;
    employee.emailId = emp.email;
    employee.mobileNo = emp.mobileNo;
    employee.districtId = emp.districtId; 
    employee.roleId = emp.roleId; 
    employee.blockId = emp.blockId;       
    employee.userCode = emp.userCode;       
    employee.accountNo = emp.accountNo;       
    employeeList.push(employee);
  });
  return employeeList;
}
}
