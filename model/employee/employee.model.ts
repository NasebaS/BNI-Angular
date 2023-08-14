import * as moment from "moment";
import { StringMappingType } from "typescript";
export class Employee {
  corpEmpId: number;
  firstName: string;
  lastName: string;
  nationalId: string;
  gender: number;
  bloodGroup: string;
  emailId: string;
  employeeId: string;
  mobileNo: number;
  employeeName: string;
  dob: string;
  doj: string;
  claims: number;
  profileImagePath: string;
  city: string;
  genderText: string;
  policyId: string;
  insuranceNumber: string;
  address: string;
  zipCode:string;

  static getEmployeeList(data): Employee[] {
    var employeeList: Employee[] = [];
    let empData = data["employeeList"];
    empData.forEach((emp) => {
      let employee = new Employee();      
      employee.corpEmpId = emp.corpEmpId;
      employee.employeeId = emp.employeeId;
      employee.firstName = emp.firstName;
      employee.lastName = emp.lastName;
      employee.employeeName = emp.firstName + " "+emp.lastName;
      employee.nationalId = emp.nationalId;
      employee.policyId = emp.policyId;
      employee.insuranceNumber = emp.insuranceNumber;
      employee.gender = emp.gender;
      if (emp.gender == 1) {
        employee.genderText = "Male";
      } else if (emp.gender == 2) {
        employee.genderText = "Female";
      } else {
        employee.genderText = "Other";
      }
      employee.bloodGroup = emp.bloodGroup;
      employee.emailId = emp.email;
      employee.mobileNo = emp.mobile;
      employee.city = emp.city;
      employee.address = emp.address;
      employee.zipCode = emp.zipCode;
      employee.dob = moment(emp.dob, "YYYY-MM-DD HH:mm:ss ZZ").format("DD-MM-YYYY");
      if(employee.dob=="Invalid date")
        employee.dob="";
      employee.doj = moment(emp.doj, "YYYY-MM-DD HH:mm:ss ZZ").format("DD-MM-YYYY");
      employee.profileImagePath = emp.profileImagePath;
      employee.claims = emp.claims;

      
      employeeList.push(employee);
    });
    return employeeList;
  }
}
