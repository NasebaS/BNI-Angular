// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultauth: "fackbackend",
  //  domainName: "https://bni.dishanifashionindia.com/",
  domainName: "http://localhost:3000/",

  // domainName: "https://annztech.com/",

  loginURL: "validateUserLogin",

  createMemberURL:"createMember",
  getLeadListURL: "device/api/v1/lead/list",
  getDistrictListURL: "device/api/v1/district/list",
  getBlockListURL: "device/api/v1/block/list",
  getRoleListURL: "device/api/v1/role/list",
  addLeadURL: "device/api/v1/lead/create",
  getUserListURL: "device/api/v1/user/list",

  getLedgerListURL:"api/ledger",  
  getExpenseListURL:"api/expense",

  addUserURL: "device/api/v1/user/create",

  addLedgerURL: "api/ledger",
  addExpenseURL: "api/expense",

  updateUserURL: "device/api/v1/user/update",
  updateLedgerURL: "api/ledger",
  updateExpenseURL: "api/expense",

  change_password: "device/api/v1/user/change-password",
  deleteUserURL: "device/api/v1/user/softDelete",

  deleteLedgerURL: "api/ledger",
  deleteExpenseURL: "api/expense",

  updateLeadURL:"device/api/v1/lead/update",
  
  getEmployeeListURL: "getCorpEmployeeList",

  addOrUpdateEmployeeURL: "createNewCorpEmployee",
  
  getAppointmentListURL: "getCorpAppointmentList",
  addOrUpdateAppointmentURL: "postNewCorpServiceRequest",
  getAppointmentDetailsURL: "getCorpAppointmentDetails",
  getStaffListForSectorURL: "getStaffsForSector",
  fileUploadURL: "fileUpload",
  loginPageImageURL: "loginPageImage",
  getSectorListURL: "getPackageListForCorp",
  getLabListURL: "getCorpEligibleLabList",
  getEmployeerDashboardURL: "getEmployeerDashboard",
  verifyCouponCodeURL: "validateEmployeerCoupon",
  importEmployeeFromExcelURL: "importEmployeesFromExcel",

  getMemberListURL: "getmember",
  getUnattendedMemberLogURL: "unattendedMember",

  // importEmployeeFromExcelURL: "importEmployeesFromExcel",

  firebaseConfig: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
  },
};
