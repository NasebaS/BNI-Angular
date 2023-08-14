import { AppointmentStages, AppointmentStatus } from "src/utils/app-constants";
import { UtilService } from "src/utils/util.service";
import { AppointmentService } from "./appointment-service.model";
import { AppointmentStatusLog } from "./appointment-status-log.model";
import { ServicePrice } from "./service-price.model";
import { TestResult } from "./test-result.model";
import * as moment from "moment";

export class AppointmentDetails {
  appointmentId: number;
  sectorId: number;
  appointmentStatus: number;
  appointmentCurrentStatus: number;
  serviceProviderId: number;
  serviceDescription: string;
  serviceOption: number;
  servicePrice: number=0;
  promotionalDiscount: number=0;
  serviceDate: string;
  serviceTime: string;
  createdDate: string;
  address: string;
  serviceLatitude: string;
  serviceLongitude: string;
  labName: string;
  serviceNotes: string;
  patientNotes: string;
  promoCode:string;
  bloodGroup: string;
  city: string;
  zipCode: string;
  employeerName: string;
  logoPath: string;
  employeeId: string;
  corpEmpId: number;
  patientFirstName: string;
  patientLastName: string;
  email: string;
  dob: string;
  mobileNumber: number;
  gender: number;
  nationalId: string;
  packageName:string;
  packageNameArabic: string;
  parctiseUserId:string;
  providerEmail:string;
  providerMobile:string;
  userRoleId:string;
  providerLastName:string;
  providerFirstName:string;
  testResults: TestResult[];
  statusHistory: AppointmentStatusLog[];
  genderText: string;
  appointmentStatusText: string;
  appointmentCurrentStatusText: string;
  serviceOptionText: string;
  appointmentIdText: string;
  requestedServices: AppointmentService[];
  appointmentPriceDetails: ServicePrice;

  static initalizeAppointmentDetails(appointmentDetails): AppointmentDetails {
    var appointment = appointmentDetails["appointmentDetails"];
    var apptDetails = new AppointmentDetails();
    apptDetails.appointmentId = appointment["appointmentId"];
    apptDetails.appointmentIdText = "APP"+appointment["appointmentId"];
    // apptDetails.sectorId = appointment["serviceSectorId"];
    apptDetails.appointmentStatus = appointment["appointmentStatus"];
    apptDetails.appointmentCurrentStatus = appointment["appointmentCurrentStatus"];
    apptDetails.serviceProviderId = appointment["serviceProviderId"];
    apptDetails.serviceDescription = appointment["packageName"];
    apptDetails.serviceOption = appointment["serviceOption"];
    apptDetails.servicePrice = appointment["packagePrice"];
    apptDetails.serviceDate = appointment["serviceDate"];
    apptDetails.serviceTime = UtilService.time24hourTo12Hours(appointment["serviceTime"]);
    apptDetails.createdDate = appointment["createdDate"];
    apptDetails.address = appointment["address"];
    apptDetails.labName = appointment["serviceProviderName"];
    apptDetails.serviceNotes = appointment["noteToEmployeer"];
    apptDetails.city = appointment["city"];
    apptDetails.serviceLatitude = appointment["serviceLatitude"];
    apptDetails.serviceLongitude = appointment["serviceLongitude"];
    apptDetails.patientNotes = appointment["patientNotes"];
    apptDetails.employeerName = appointment["employeerName"];
    apptDetails.employeeId = appointment["employeeId"];
    apptDetails.corpEmpId = appointment["corpEmpId"];
    apptDetails.logoPath = appointment["logoPath"];
    apptDetails.patientFirstName = appointment["patientFirstName"];
    apptDetails.patientLastName = appointment["patientLastName"];
    apptDetails.mobileNumber = appointment["mobileNumber"];
    apptDetails.gender = appointment["gender"];
    apptDetails.email = appointment["email"];
    apptDetails.zipCode = appointment["zipCode"];
    apptDetails.nationalId = appointment["nationalId"];
    apptDetails.packageNameArabic=appointment["packageNameArabic"];
    apptDetails.bloodGroup=appointment["bloodGroup"];
    apptDetails.dob = moment(appointment["dob"], "YYYY-MM-DD HH:mm:ss ZZ").format("DD-MM-YYYY");
    

    if (apptDetails.gender == 1) {
      apptDetails.genderText = "Male";
    } else if (apptDetails.gender == 2) {
      apptDetails.genderText = "Female";
    } else {
      apptDetails.genderText = "Other";
    }
  

    if (apptDetails.serviceOption == 1) {
      apptDetails.serviceOptionText = "Male";
    } else if (apptDetails.serviceOption == 2) {
      apptDetails.serviceOptionText = "Female";
    } else {
      apptDetails.serviceOptionText = "Any";
    }

    if (apptDetails.gender == 1) {
      apptDetails.genderText = "Male";
    } else {
      apptDetails.genderText = "Female";
    }

    if (apptDetails.appointmentStatus == AppointmentStatus.Open) {
      apptDetails.appointmentStatusText = "Open";
    } else if (apptDetails.appointmentStatus == AppointmentStatus.Completed) {
      apptDetails.appointmentStatusText = "Completed";
    } else {
      apptDetails.appointmentStatusText = "Cancelled";
    }

    switch (apptDetails.appointmentCurrentStatus) {
      case AppointmentStages.Scheduled:
        apptDetails.appointmentCurrentStatusText = "Scheduled";
        break;
      case AppointmentStages.ArrivedDesination:
        apptDetails.appointmentCurrentStatusText = "Arrived patient location";
        break;
      case AppointmentStages.ServiceInProgress:
        apptDetails.appointmentCurrentStatusText = "Service in progress";
        break;
      case AppointmentStages.ServiceCompleted:
        apptDetails.appointmentCurrentStatusText = "Service completed";
        break;
      case AppointmentStages.OnTheWay:
        apptDetails.appointmentCurrentStatusText = "On the way";
        break;
      case AppointmentStages.ResultPublished:
        apptDetails.appointmentCurrentStatusText = "Result published";
        break;
      case AppointmentStages.SampleSubmittedToLab:
        apptDetails.appointmentCurrentStatusText = "Sample submitted to lab";
        break;
      case AppointmentStages.Accpeted:
        apptDetails.appointmentCurrentStatusText = "Accepted";
        break;
      default:
        break;
    }

    apptDetails.parctiseUserId = appointment["parctiseUserId"];
    apptDetails.userRoleId = appointment["userRoleId"];
    apptDetails.providerFirstName = appointment["providerFirstName"];
    apptDetails.providerLastName = appointment["providerLastName"];
    apptDetails.providerEmail = appointment["providerEmail"];
    apptDetails.providerMobile = appointment["providerMobile"];

    apptDetails.testResults = TestResult.getLabResults(appointment["labResult"]);
 
    apptDetails.statusHistory = AppointmentStatusLog.getAppointmentStatusHistory(appointment["statusHistory"]);
    return apptDetails;
  }
}
