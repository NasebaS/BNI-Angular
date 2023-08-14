import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { AppConstants } from "../utils/app-constants";

@Injectable({
  providedIn: "root",
})
export class AppService {
  httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };

  constructor(private _httpClient: HttpClient) {}

  // Service Provider

  userLogin(params: any) {
    return this._httpClient.post(AppConstants.loginURL, params, this.httpOptions);
  }
  createMember(params: any) {
    return this._httpClient.post(AppConstants.createMemberURL, params, this.httpOptions);
  }

  getDistrictList(parameters:any) {
    return this._httpClient.post<any>(AppConstants.getDistrictListURL, parameters);
  }

  getBlockList(params: any) {
    return this._httpClient.post<any>(AppConstants.getBlockListURL, params);
  }

  getRoleList(params: any) {
    return this._httpClient.post<any>(AppConstants.getRoleListURL, params);
  }

  getLeadList(reqParams:any) {
    return this._httpClient.post<any>(AppConstants.getLeadListURL, reqParams);
  }

  addLead(params: any) {
    return this._httpClient.post<any>(AppConstants.addLeadURL, params);
  }
  updateLead(params: any,id:any) {
    return this._httpClient.put<any>(AppConstants.updateLeadURL+'/'+id, params);
  }

  getUserList(reqParams:any ) {
    return this._httpClient.post<any>(AppConstants.getUserListURL, reqParams);
  }
  getLedgerList(reqParams:any ) {
    return this._httpClient.get<any>(AppConstants.getLedgerListURL, reqParams);
  }
  getExpenseList(reqParams:any ) {
    return this._httpClient.get<any>(AppConstants.getExpenseListURL, reqParams);
  }

  getMemberList(reqParams:any ) {
    return this._httpClient.get<any>(AppConstants.getMemberListURL, reqParams);
  }

  getUnattendedMemberList(reqParams:any ) {
    return this._httpClient.post<any>(AppConstants.getUnattendedMemberLogURL, reqParams);
  }

  addUser(params: any) {
    return this._httpClient.post<any>(AppConstants.addUserURL, params);
  }
  addLedger(params: any) {
    return this._httpClient.post<any>(AppConstants.addLedgerURL, params);
  }
  addExpense(params: any) {
    return this._httpClient.post<any>(AppConstants.addExpenseURL, params);
  }
  updateUser(params: any,id:any) {
    return this._httpClient.put<any>(AppConstants.updateUserURL+'/'+id, params);
  }
  updateLedger(params: any,id:any) {
    return this._httpClient.put<any>(AppConstants.updateLedgerURL+'/'+id, params);
  }
  updateExpense(params: any,id:any) {
    return this._httpClient.put<any>(AppConstants.updateExpenseURL+'/'+id, params);
  }
  deleteUser(id:any) {
    let reqParams = {};
    return this._httpClient.put<any>(AppConstants.deleteUserURL+'/'+id, reqParams);
  }
  deleteLedger(id:any) {
    let reqParams = {};
    return this._httpClient.delete<any>(AppConstants.deleteLedgerURL+'/'+id, reqParams);
  }
  deleteExpense(id:any) {
    let reqParams = {};
    return this._httpClient.delete<any>(AppConstants.deleteExpenseURL+'/'+id, reqParams);
  }
  change_password(params: any) {
    return this._httpClient.put<any>(AppConstants.change_password, params);
  }

  getloginPageLogo(params: any) {
    return this._httpClient.post<any>(AppConstants.loginPageImageURL, params);
  }

  getEmployeeList(params: any) {
    return this._httpClient.post<any>(AppConstants.getEmployeeListURL, params);
  }

  addOrUpdateEmployee(params: any) {
    return this._httpClient.post<any>(AppConstants.addOrUpdateEmployeeURL, params);
  }

  getAppointmentList(params: any) {
    return this._httpClient.post<any>(AppConstants.getAppointmentListURL, params);
  }

  addOrUpdateAppointment(params: any) {
    return this._httpClient.post<any>(AppConstants.addOrUpdateAppointmentURL, params);
  }

  verifyCouponCode(params: any) {
    return this._httpClient.post<any>(AppConstants.verifyCouponCodeURL, params);
  }

 
  getSectorList() {
    let reqParams = {};
    return this._httpClient.post<any>(AppConstants.getDistrictListURL, reqParams);
  }
  
  getLabList() {
    let reqParams = {};
    return this._httpClient.post<any>(AppConstants.getLabListURL, reqParams);
  }
  getDashboardDataList() {
    let reqParams = {};
    return this._httpClient.post<any>(AppConstants.getDashboardDataURL, reqParams);
  }

  getAppoitmentDetails(appointmentId: string) {
    let reqParams = {
      appointmentId: appointmentId,
    };
    return this._httpClient.post<any>(AppConstants.getAppointmentDetailsURL, reqParams);
  }

  getPractiseUserForSector(userRoleId: string) {
    let reqParams = {
      userRoleId: userRoleId,
    };
    return this._httpClient.post<any>(AppConstants.getStaffListForSectorURL, reqParams);
  }

  getServiceListForSector(sectorId) {
    let reqParams = {
      servicePrimarySectorId: sectorId,
    };
    return this._httpClient.post<any>(AppConstants.getServiceListURL, reqParams);
  }

  uploadfileToServer(imageFile: File, fileUploadType: number, fileSourceId: string) {
    let fileUploadUrl = AppConstants.fileUploadURL;
    let uploadType = fileUploadType.toString();
    const formData: FormData = new FormData();
    formData.append("uploadedImage", imageFile, imageFile.name);
    formData.append("fileName", imageFile.name);
    formData.append("fileUploadType", uploadType);
    formData.append("fileSourceId", fileSourceId);
    return this._httpClient.post(fileUploadUrl, formData);
  }

  importEmployeeListFromExcel(excelFile: File, fileUploadType: number, fileSourceId: string) {
    let fileUploadUrl = AppConstants.fileUploadURL;
    const formData: FormData = new FormData();
    formData.append("excelFile", excelFile, excelFile.name);
    formData.append("fileName", excelFile.name);
    return this._httpClient.post(fileUploadUrl, formData);
  }
}
