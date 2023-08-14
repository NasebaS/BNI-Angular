import * as moment from "moment";
import { StringMappingType } from "typescript";
export class Role {
  roleId: number;
  roleName: string;
  roleCode: string;
  weight: number;
  
  static getRoleList(data): Role[] {
    var employeeList: Role[] = [];
    let empData = data["data"];
    empData.forEach((emp) => {
      let employee = new Role();      
      employee.roleId = emp.id;
      employee.roleName = emp.name;    
      employee.roleCode = emp.code;    
      employee.weight = emp.weight;      
      employeeList.push(employee);
    });
    return employeeList;
  }
}
