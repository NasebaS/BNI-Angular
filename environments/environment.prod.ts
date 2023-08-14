// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultauth: "fackbackend",
  //  domainName: "https://crm-api.vttech.dev/",
  domainName: "http://localhost:3000/",

  // domainName: "https://annztech.com/",

  loginURL: "device/auth/login",
  getLeadListURL: "device/api/v1/lead/list",
  getDistrictListURL: "device/api/v1/district/list",
  getBlockListURL: "device/api/v1/block/list",
  getRoleListURL: "device/api/v1/role/list",
  addLeadURL: "device/api/v1/lead/create",
  getUserListURL: "device/api/v1/user/list",
  addUserURL: "device/api/v1/user/create",
  deleteUserURL: "device/api/v1/user/softDelete",
  
  
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
