import * as moment from "moment";
import { AppointmentStageMessages, AppointmentStages, AppointmentStatus } from "src/utils/app-constants";
import { UtilService } from "src/utils/util.service";

export class Appointment {
  appointmentId: string;
  serviceSectorId: number;
  serviceName: string;
  serviceGender: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentStatus: number;
  appointmentCurrentStatus: number;
  appointmentBookingDate: string;

  appointmentBookingDateTime: string;
  servicePrice: string;

  patientFirstName: string;
  patientLastName: string;
  patientMobile: string;
  patientEmail: string;
  appointmentDisplayId: string;
  nationalId: string;
  sAppointmentBookingDate: string;
  appointmentStatusMessage: string;
  appointmentStage: string;
  patientSource: string;
  city: string;
  corpEmpId: number;
  employeeId:string;
  serviceId: number;
  labName:string;
  appointmentDateFormat:string;

  resultReadingRequestDate: string;

  static getAppointmentList(appointments): Appointment[] {
    var appointmentList: Array<Appointment> = [];
    if (appointments == null) {
      return appointmentList;
    }
    appointments.forEach((data) => {
      var appointment = new Appointment();
      appointment.appointmentId = data["appointmentId"];
      appointment.appointmentStatus = data["appointmentStatus"];
      appointment.appointmentCurrentStatus = data["appointmentCurrentStatus"];      
      appointment.servicePrice = data["packagePrice"];
      appointment.patientFirstName = data["patientFirstName"];
      appointment.patientLastName = data["patientLastName"];
      var serviceDate = data["serviceDate"];
      appointment.appointmentDate = moment(serviceDate, "YYYY-MM-DD HH:mm:ss ZZ").format("DD-MM-YYYY");

      appointment.appointmentTime = UtilService.time24hourTo12Hours(data["serviceTime"]);

      var bookingDate = data["createdDate"];
      appointment.appointmentBookingDate = moment(bookingDate, "YYYY-MM-DD HH:mm:ss ZZ").format("DD-MM-YYYY hh:mm a");
      appointment.sAppointmentBookingDate = moment(bookingDate, "YYYY-MM-DD HH:mm:ss ZZ").format("YYYY-MM-DD");
      appointment.appointmentDateFormat = moment(bookingDate, "YYYY-MM-DD HH:mm:ss ZZ").format("DD MMM, YYYY");
      switch (appointment.appointmentStatus) {
        case AppointmentStatus.Open:
          appointment.appointmentStatusMessage = "Open";
          break;
        case AppointmentStatus.Cancelled:
          appointment.appointmentStatusMessage = "Cancelled";
          break;
          case AppointmentStatus.Completed:
            appointment.appointmentStatusMessage = "Completed";
            break;
        default:
          break;
      }

      switch (appointment.appointmentCurrentStatus) {
        case AppointmentStages.Accpeted:
          appointment.appointmentStage = AppointmentStageMessages.Accpeted;
          break;
        case AppointmentStages.ArrivedDesination:
          appointment.appointmentStage = AppointmentStageMessages.ArrivedDesination;
          break;
        case AppointmentStages.ServiceCompleted:
          appointment.appointmentStage = AppointmentStageMessages.CollectionCompleted;
          break;
        case AppointmentStages.ServiceInProgress:
          appointment.appointmentStage = AppointmentStageMessages.CollectionInProgress;
          break;
        case AppointmentStages.OnTheWay:
          appointment.appointmentStage = AppointmentStageMessages.OnTheWay;
          break;
        case AppointmentStages.ResultPublished:
          appointment.appointmentStage = AppointmentStageMessages.ResultPublished;
          break;
        case AppointmentStages.SampleSubmittedToLab:
          appointment.appointmentStage = AppointmentStageMessages.SampleSubmittedToLab;
          break;
        case AppointmentStages.Scheduled:
          appointment.appointmentStage = AppointmentStageMessages.Scheduled;
          break;
        default:
          break;
      }
      appointment.appointmentDisplayId = "APP" + appointment.appointmentId;
      appointment.employeeId = data["employeeId"];
      appointment.city = data["city"];      
      appointment.labName = data["serviceProviderName"];      
      
      appointment.corpEmpId = data["corpEmpId"];
      appointment.patientEmail = data["email"];
      appointment.patientMobile = data["mobileNumber"];
      appointment.serviceName = data["packageName"];
      appointment.serviceId = data["serviceId"];
      
      // appointment.serviceName = data["sectorName"] + " - Home visit";

      appointmentList.push(appointment);
    });
    return appointmentList;
  }
}
