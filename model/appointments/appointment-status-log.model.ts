import * as moment from "moment";
import { AppointmentLogStatus } from "src/utils/app-enum";
import { AppointmentStages } from "src/utils/app-constants";

export class AppointmentStatusLog {
    statusId: number;
    currentStatus: number;
    latitude: string;
    longitude: string;
    address: string;
    createdDate: string;
    updateDate: string;
    updateTime: string;
    statusText: string;
    logStatus: number;

    static getAppointmentStatusHistory(historyData): AppointmentStatusLog[] {
        let history: AppointmentStatusLog[] = [];
        historyData.forEach(statusData => {
            let status = new AppointmentStatusLog();
            status.statusId = statusData.statusId;
            status.currentStatus = statusData.currentStatus;
            status.latitude = statusData.latitude;
            status.longitude = statusData.longitude;
            status.address = statusData.address;
            status.updateDate = moment(statusData.createdDate, 'YYYY-MM-DD HH:mm:ss ZZ').format('DD-MM-YYYY');
            status.updateTime = moment(statusData.createdDate, 'YYYY-MM-DD HH:mm:ss ZZ').format('hh:mm a');
            status.logStatus = AppointmentLogStatus.Completed;
            switch (statusData.currentStatus) {
                case AppointmentStages.Scheduled:
                    status.statusText = "Scheduled";
                  break;
                case AppointmentStages.ArrivedDesination:
                    status.statusText = "Arrived patient location";
                  break;
                case AppointmentStages.ServiceInProgress:
                    status.statusText = "Service in progress";
                  break;
                case AppointmentStages.ServiceCompleted:
                    status.statusText = "Service completed";
                  break;
                case AppointmentStages.OnTheWay:
                    status.statusText = "On the way";
                  break;
                case AppointmentStages.ResultPublished:
                    status.statusText = "Result published";
                  break;
                case AppointmentStages.SampleSubmittedToLab:
                    status.statusText = "Sample submitted to lab";
                  break;
                case AppointmentStages.Accpeted:
                    status.statusText = "Accepted";
                  break;
                default:
                  break;
              }
            history.push(status);
        });

        for (let index = history.length+1; index < 8; index++) {
            let status = new AppointmentStatusLog();
            status.statusId = 0;
            status.currentStatus = index;
            status.latitude = "";
            status.longitude = "";
            status.address = "";
            status.updateDate = "--";
            status.updateTime = "--";
            status.logStatus = AppointmentLogStatus.Open;
            switch (index) {
                case AppointmentStages.Scheduled:
                    status.statusText = "Scheduled";
                  break;
                case AppointmentStages.ArrivedDesination:
                    status.statusText = "Arrived patient location";
                  break;
                case AppointmentStages.ServiceInProgress:
                    status.statusText = "Service in progress";
                  break;
                case AppointmentStages.ServiceCompleted:
                    status.statusText = "Service completed";
                  break;
                case AppointmentStages.OnTheWay:
                    status.statusText = "On the way";
                  break;
                case AppointmentStages.ResultPublished:
                    status.statusText = "Result published";
                  break;
                case AppointmentStages.SampleSubmittedToLab:
                    status.statusText = "Sample submitted to lab";
                  break;
                case AppointmentStages.Accpeted:
                    status.statusText = "Accepted";
                  break;
                default:
                  break;
              }
            history.push(status);
        }

        return history;
    }
}