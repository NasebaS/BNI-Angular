import { Appointment } from "../appointments/appointment.model";

export class AdminDashboard {
    todayAppointmentCount: number;
    totalAppointmentsCount: number;
    totalPatientsCount: number;
    totalStaffsCount: number;
    latestAppointments: Appointment[];


    static getAdminDashboard(data): AdminDashboard {
        var dashboard = new AdminDashboard();
        dashboard.todayAppointmentCount = data.todayAppointmentCount;
        dashboard.totalAppointmentsCount = data.totalAppointmentsCount;
        dashboard.totalPatientsCount = data.totalPatientsCount;
        dashboard.totalStaffsCount = data.totalStaffsCount;
        dashboard.latestAppointments = Appointment.getAppointmentList(data.latestAppointments);
        return dashboard;
    }
}
