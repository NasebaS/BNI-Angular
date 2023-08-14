export class Patient {
  patientId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  gender: number;
  address: string;
  bloodGroup: string;
  dob: string;
  isActive: number;
  sourceName: string;
  sourceId: number;
  nationalId: string;
  walletBalance: string;

  genderText: string;
  patientDisplayId: string;

  static getPatientsList(response): Patient[] {
    var patientList: Array<Patient> = [];
    let patientsResponse = response["patientList"];

    patientsResponse.forEach((data) => {
      var patient = new Patient();
      patient.patientId = data["patientId"];
      patient.firstName = data["firstName"];
      patient.lastName = data["lastName"];
      patient.email = data["email"];
      patient.mobileNumber = data["mobileNumber"];
      patient.gender = data["gender"];
      patient.address = data["address"];
      patient.bloodGroup = data["bloodGroup"];
      patient.dob = data["dob"];
      patient.isActive = data["isActive"];
      patient.sourceName = data["sourceName"];
      patient.sourceId = data["sourceId"];
      patient.nationalId = data["idNumber"];
      patient.walletBalance = data["walletBalance"];
      patient.patientDisplayId = "PAT" + Patient.zeroPad(patient.patientId, 4);

      var gender = data["gender"];
      if (gender == "1") {
        patient.genderText = "Male";
      } else if (gender == "2") {
        patient.genderText = "Female";
      }
      patient.gender = gender;

      patientList.push(patient);
    });
    return patientList;
  }

  static zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }
}
